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
  Spinner,
} from "@nextui-org/react";
import { PencilLine, SearchIcon, Trash2 } from "lucide-react";
import { TResponse, TUserReturn } from "@/globalInterface/interface";
import { toast } from "sonner";
import {
  useGetAllUsersQuery,
  useMakeAdminMutation,
  useRemoveUserMutation,
} from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];
const statusColorMap = {
  ACTIVE: "success",
  INACTIVE: "danger",
};
const AllUsers = () => {
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
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [deleteUser] = useRemoveUserMutation();
  const [makeUserAdmin] = useMakeAdminMutation();
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const remove = async (id: string) => {
    try {
      const res = (await deleteUser(id)) as TResponse<TUserReturn>;
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
  const makeAdmin = async (id: string) => {
    try {
      const res = (await makeUserAdmin(id)) as TResponse<TUserReturn>;
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
    : data?.data.map((userData: TUserReturn) => {
        return {
          id: userData.id,
          status: userData.status,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          avatar: userData.photo,
        };
      });

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email.toLowerCase().includes(filterValue.toLowerCase())
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
        email: string;
        avatar: string;
        role: string;
        status: string;
      },
      columnKey: string
    ) => {
      const cellValue =
        user[
          columnKey as "id" | "name" | "email" | "avatar" | "role" | "status"
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
                statusColorMap[user.status as "INACTIVE" | "ACTIVE"] as
                  | "warning"
                  | "danger"
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
                <Tooltip color="primary" content="Make user Admin">
                  <Button
                    color="primary"
                    variant="light"
                    size="sm"
                    onClick={() => makeAdmin(user.id)}
                    className="rounded-full"
                  >
                    <PencilLine />
                  </Button>
                </Tooltip>
                <Tooltip color="danger" content="Remove user">
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    className="rounded-full"
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
            placeholder="Search by email..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} Users
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
        <TableBody emptyContent={"No User Found"} items={items}>
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

export default AllUsers;
