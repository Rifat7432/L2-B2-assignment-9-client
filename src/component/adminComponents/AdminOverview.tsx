"use client";
import CountUp from "react-countup";
import { LineChart } from "@mui/x-charts/LineChart";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks/hooks";
import { toast } from "sonner";
import { useGetAllUsersQuery } from "@/redux/features/auth/authApi";
import { Spinner, User } from "@nextui-org/react";
import {
  useGetAdminOverviewQuery,
  useGetAllPetsQuery,
} from "@/redux/features/pet/petApi";
import { useGetAllAdoptionRequestQuery } from "@/redux/features/adopt/adoptApi";
import { BarChart } from "@mui/x-charts";
import { TAdminUser } from "@/globalInterface/interface";
import AdminDashboardLayout from "./AdminDashboardLayout";
import dashboardUserImage from "@/assets/dashboaedUser.png";
import dashboardPetImage from "@/assets/dashbordPetImg.jpeg";
import dashboardRequestImage from "@/assets/requesImg.jpg";
import Image from "next/image";

const AdminOverview = () => {
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
  const { data, isLoading, error } = useGetAdminOverviewQuery(undefined);
  if (isLoading) {
    return (
      <div className="w-[90%] mt-96 mx-auto flex flex-col items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const totalUsers = data?.data.totalUser ? data?.data?.totalUser.length : 0;
  const totalRemainPet = data?.data?.totalRemainPet
    ? data?.data?.totalRemainPet.length
    : 0;
  const totalPets = data?.data?.totalPet ? data?.data?.totalPet.length : 0;
  const totalAdoptedPets = data?.data?.totalAdoptedPet
    ? data?.data?.totalAdoptedPet.length
    : 0;
  const totalPetsRequest = data?.data?.totalRequest
    ? data?.data?.totalRequest.length
    : 0;
  const generateNumberArray = (lastNumber: number): number[] => {
    return Array.from({ length: lastNumber }, (_, index) => index + 1);
  };
  let january = 0;
  let february = 0;
  let march = 0;
  let april = 0;
  let may = 0;
  let june = 0;
  let july = 0;
  let august = 0;
  let september = 0;
  let october = 0;
  let november = 0;
  let december = 0;

  data?.data?.totalUser?.map((request: TAdminUser) => {
    const month = new Date(request.createdAt).toLocaleString("default", {
      month: "long",
    });
    if (month === "January") {
      january += 1;
    } else if (month === "February") {
      february += 1;
    } else if (month === "March") {
      march += 1;
    } else if (month === "April") {
      april += 1;
    } else if (month === "May") {
      may += 1;
    } else if (month === "June") {
      june += 1;
    } else if (month === "July") {
      july += 1;
    } else if (month === "August") {
      august += 1;
    } else if (month === "September") {
      september += 1;
    } else if (month === "October") {
      october += 1;
    } else if (month === "November") {
      november += 1;
    } else if (month === "December") {
      december += 1;
    }
  });
  return (
    <div className="w-11/12 mx-auto">
      <div className="">
        <div className="w-11/12 mx-auto dark:bg-slate-800 rounded-lg bg-slate-200 m-5 p-5">
          <User
            avatarProps={{
              src: `${user?.photo}`,
            }}
            description={user?.role}
            name={user?.email}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          <div className="shadow-xl hover:bg-[#02D5D1] w-11/12 m-5 p-5 dark:bg-slate-800 rounded-lg bg-slate-200">
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Image
                  src={dashboardRequestImage}
                  alt="dashboardUserImage"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-lg"
                />
              </div>
              <div>
                <div className="text-xl font-bold">Total Adoption Request</div>
                <div>
                  <h4 className="text-xl pl-4 font-semibold">
                    <CountUp
                      end={Number(totalPetsRequest)}
                      duration={4}
                    ></CountUp>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-xl hover:bg-[#02D5D1] w-11/12 m-5 p-5 dark:bg-slate-800 rounded-lg bg-slate-200">
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Image
                  src={dashboardPetImage}
                  alt="dashboardUserImage"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-lg"
                />
              </div>
              <div>
                <div className="text-xl font-bold">Total Pets</div>
                <div>
                  <h4 className="text-xl pl-4 font-semibold">
                    <CountUp
                      end={Number(totalRemainPet)}
                      duration={4}
                    ></CountUp>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-xl hover:bg-[#02D5D1] w-11/12 m-5 p-5 dark:bg-slate-800 rounded-lg bg-slate-200">
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Image
                  src={dashboardUserImage}
                  alt="dashboardUserImage"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-lg"
                />
              </div>
              <div>
                <div className="text-xl font-bold">Total User</div>
                <div>
                  <h4 className="text-xl pl-4 font-semibold">
                    <CountUp end={Number(totalUsers)} duration={4}></CountUp>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 py-5">
        <div>
          <div className="hidden md:block dark:bg-slate-800 rounded-lg bg-slate-200 py-4">
            <LineChart
              xAxis={[
                {
                  data: [0, ...generateNumberArray(Number(totalPets))],
                },
              ]}
              series={[
                {
                  data: [0, ...generateNumberArray(Number(totalAdoptedPets))],
                  area: true,
                },
              ]}
              grid={{ vertical: true, horizontal: true }}
              height={400}
            />
            <div className="mx-auto w-11/12 text-center text-xl font-bold my-10">
              Total Pets VS. Total Adopted Pets
            </div>
          </div>
          <div className="hidden sm:block md:hidden dark:bg-slate-800 rounded-lg bg-slate-200 py-4">
            <LineChart
              xAxis={[
                {
                  data: [0, ...generateNumberArray(Number(totalPets))],
                },
              ]}
              series={[
                {
                  data: [0, ...generateNumberArray(Number(totalAdoptedPets))],
                  area: true,
                },
              ]}
              height={300}
              grid={{ vertical: true, horizontal: true }}
            />
            <div className="mx-auto w-11/12 text-center text-xl font-bold my-10">
              Total Pets VS. Total Adopted Pets
            </div>
          </div>
          <div className="block sm:hidden dark:bg-slate-800 rounded-lg bg-slate-200 py-4">
            <LineChart
              xAxis={[
                {
                  data: [0, ...generateNumberArray(Number(totalPets))],
                },
              ]}
              series={[
                {
                  data: [0, ...generateNumberArray(Number(totalAdoptedPets))],
                  area: true,
                },
              ]}
              height={250}
              grid={{ vertical: true, horizontal: true }}
            />
            <div className="mx-auto w-11/12 text-center text-xl font-bold my-10">
              Total Pets VS. Total Adopted Pets
            </div>
          </div>
        </div>
        <div>
          <div className="hidden md:block dark:bg-slate-800 rounded-lg bg-slate-200 py-4">
            <BarChart
              series={[
                {
                  data: [
                    january,
                    february,
                    march,
                    april,
                    may,
                    june,
                    july,
                    august,
                    september,
                    october,
                    november,
                    december,
                  ],
                },
              ]}
              height={400}
              grid={{ vertical: true, horizontal: true }}
              xAxis={[
                {
                  data: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ],
                  scaleType: "band",
                },
              ]}
            />
            <div className="mx-auto w-11/12 text-center text-xl font-bold my-10">
              Total User VS. Month
            </div>
          </div>
          <div className="hidden sm:block md:hidden dark:bg-slate-800 rounded-lg bg-slate-200 py-4">
            <BarChart
              series={[
                {
                  data: [
                    january,
                    february,
                    march,
                    april,
                    may,
                    june,
                    july,
                    august,
                    september,
                    october,
                    november,
                    december,
                  ],
                },
              ]}
              height={300}
              grid={{ vertical: true, horizontal: true }}
              xAxis={[
                {
                  data: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ],
                  scaleType: "band",
                },
              ]}
            />{" "}
            <div className="mx-auto w-11/12 text-center text-xl font-bold my-10">
              Total User VS. Month
            </div>
          </div>
          <div className="block sm:hidden dark:bg-slate-800 rounded-lg bg-slate-200 py-4">
            <BarChart
              series={[
                {
                  data: [
                    january,
                    february,
                    march,
                    april,
                    may,
                    june,
                    july,
                    august,
                    september,
                    october,
                    november,
                    december,
                  ],
                },
              ]}
              height={250}
              grid={{ vertical: true, horizontal: true }}
              xAxis={[
                {
                  data: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ],
                  scaleType: "band",
                },
              ]}
            />
            <div className="mx-auto w-11/12 text-center text-xl font-bold my-10">
              Total User VS. Month
            </div>
          </div>
        </div>
      </div>
      <div className="dark:bg-slate-800 rounded-lg bg-slate-200">
        <AdminDashboardLayout />
      </div>
    </div>
  );
};

export default AdminOverview;
