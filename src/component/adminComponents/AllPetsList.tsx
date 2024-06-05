"use client";

import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  User,
  Pagination,
  Link,
  Chip,
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import {
  EyeIcon,
  PencilLine,
  PlusIcon,
  SearchIcon,
  Trash2,
} from "lucide-react";
import { TPet, TResponse } from "@/globalInterface/interface";
import {
  useDeletePetMutation,
  useGetAllPetsQuery,
} from "@/redux/features/pet/petApi";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "SPECIES", uid: "species" },
  { name: "BREED", uid: "breed" },
  { name: "GENDER", uid: "gender" },
  { name: "LOCATION", uid: "location" },
  { name: "AGE", uid: "age" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];
const statusColorMap = {
  AVAILABLE: "success",
  REMOVED: "danger",
  ADOPTED: "warning",
};
const AllPetsList = () => {
  const navigate = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetAllPetsQuery({});
  const [deletePet] = useDeletePetMutation();
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  if (!user) {
    toast.warning("Login First");
    navigate.push("/login");
  } else {
    if (user.role !== "ADMIN") {
      navigate.push("/");
    }
  }
  const remove = async (id: string) => {
    try {
      const res = (await deletePet(id)) as TResponse<TPet>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const hasSearchFilter = Boolean(filterValue);
  const users = isLoading
    ? []
    : data?.data.map((userData: TPet) => {
        return {
          id: userData.id,
          status: userData.status,
          name: userData.name,
          breed: userData.breed,
          gender: userData.gender,
          location: userData.location,
          age: userData.age,
          avatar: userData.photos[0],
          species: userData.species,
        };
      });

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = useCallback(
    (
      user: {
        id: string;
        name: string;
        age: number;
        avatar: string;
        species: string;
        status: string;
      },
      columnKey: string
    ) => {
      const cellValue =
        user[
          columnKey as "id" | "name" | "age" | "avatar" | "species" | "status"
        ];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.avatar }}
              name={cellValue}
            ></User>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={
                statusColorMap[
                  user.status as "REMOVED" | "ADOPTED" | "AVAILABLE"
                ] as "warning" | "danger" | "success"
              }
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <div className="relative flex items-center gap-2">
                <Tooltip content="Details">
                  <Link
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    color="foreground"
                    href={`/pets/${user.id}`}
                  >
                    <EyeIcon />
                  </Link>
                </Tooltip>
                <Tooltip content="Edit">
                  <Link
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    color="foreground"
                    href={`/editPet/${user.id}`}
                  >
                    <PencilLine />
                  </Link>
                </Tooltip>
                <Tooltip color="danger" content="Remove">
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    onClick={() => remove(user.id)}
                  >
                    <Trash2 />
                  </Button>
                </Tooltip>
              </div>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e: { target: { value: any } }) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-around gap-3 items-center">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <Button color="primary" as={Link} href="/addPet" variant="flat">
            ADD NEW <PlusIcon />
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} Pets
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows Per Page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === pages}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);
  if (isLoading) {
    return (
      <div className="w-[90%] mt-96 mx-auto flex flex-col items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div className="py-6 w-11/12 mx-auto">
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectionMode="multiple"
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No Pets Found"} items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey as string)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllPetsList;
