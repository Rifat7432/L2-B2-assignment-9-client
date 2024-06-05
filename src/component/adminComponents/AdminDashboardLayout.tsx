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
  Chip,
  Tooltip,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { TAdopt, TPet, TUserReturn } from "@/globalInterface/interface";
import { useGetAllAdoptionRequestQuery } from "@/redux/features/adopt/adoptApi";
import AdoptionRequestModal from "./AdoptionRequestModal";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks/hooks";
import { toast } from "sonner";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "Contact Information", uid: "contactInformation" },
  { name: "Pet Ownership Experience", uid: "petOwnershipExperience" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];
const statusColorMap = {
  APPROVED: "success",
  REJECTED: "danger",
  PENDING: "warning",
};

const AdminDashboardLayout = () => {
  const navigate = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  if (!user) {
    toast.warning("Login First");
    navigate.push("/login");
  } else {
    if (user.role !== "ADMIN") {
      navigate.push("/");
    }
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, isLoading } = useGetAllAdoptionRequestQuery(undefined);
  const [filterValue, setFilterValue] = useState("");
  const [modalData, setModalData] = useState<{
    id: string;
    name: string;
    petOwnershipExperience: string;
    contactInformation: string;
    avatar: string;
    status: string;
    pet: TPet;
    user: TUserReturn;
  } | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const users = isLoading
    ? []
    : data?.data
    ? data?.data.map((userData: TAdopt) => {
        return {
          id: userData.id,
          name: userData.pet.name,
          contactInformation: userData.contactInformation,
          petOwnershipExperience: userData.petOwnershipExperience,
          avatar: userData.pet.photos[0],
          status: userData.status,
          pet: userData.pet,
          user: userData.user,
        };
      })
    : [];

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
        petOwnershipExperience: string;
        contactInformation: string;
        avatar: string;
        status: string;
        pet: TPet;
        user: TUserReturn;
      },
      columnKey: string
    ) => {
      const cellValue =
        user[
          columnKey as
            | "id"
            | "name"
            | "petOwnershipExperience"
            | "avatar"
            | "status"
        ];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.avatar }}
              name={cellValue}
            ></User>
          );
        case "petOwnershipExperience":
          return (
            <>
              {user.petOwnershipExperience.length > 30 ? (
                <Tooltip content={user.petOwnershipExperience}>
                  <p>{user.petOwnershipExperience.slice(0, 30)}...</p>
                </Tooltip>
              ) : (
                <p>{user.petOwnershipExperience}</p>
              )}
            </>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={
                statusColorMap[
                  user.status as "PENDING" | "APPROVED" | "REJECTED"
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
              <Button
                onPress={onOpen}
                onClick={() => setModalData(user)}
                color="primary"
                variant="light"
              >
                Detail
              </Button>
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
        <div className="flex justify-center gap-3 items-center">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} Request
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
        <TableBody emptyContent={"No Request Found"} items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey as string)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div>
        {modalData ? (
          <AdoptionRequestModal
            modalData={modalData}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          ></AdoptionRequestModal>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
