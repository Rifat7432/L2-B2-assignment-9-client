"use client";
import CountUp from "react-countup";
import { LineChart } from "@mui/x-charts/LineChart";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks/hooks";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/react";
import { BarChart } from "@mui/x-charts";
import { useGetUserOverviewQuery } from "@/redux/features/pet/petApi";
import { TAdopt } from "@/globalInterface/interface";
import Image from "next/image";
import dashboardPetImage from "@/assets/dashbordPetImg.jpeg";
import dashboardRequestImage from "@/assets/requesImg.jpg";

const UserOverview = () => {
  const navigate = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  if (!user) {
    toast.warning("Login First");
    navigate.push("/login");
  }
  const { data: overview, isLoading } = useGetUserOverviewQuery(user?.userId);
  if (isLoading) {
    return (
      <div className="w-[90%] mt-96 mx-auto flex flex-col items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  const totalPets = overview?.data?.totalUserPet
    ? overview?.data?.totalUserPet.length
    : 0;
  const totalPetsRequest = overview?.data?.totalUserRequest
    ? overview?.data?.totalUserRequest.length
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

  overview?.data?.totalUserRequest?.map((request: TAdopt) => {
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
    <div className="w-full md:w-11/12 mx-auto py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
        <div className=" hover:bg-[#02D5D1]  p-5 dark:bg-slate-800 rounded-lg bg-slate-100">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Image
                src={dashboardRequestImage}
                alt="dashboardUserImage"
                width={112}
                height={80}
                className="w-28 h-20 rounded-lg"
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
        <div className=" hover:bg-[#02D5D1]  p-5 dark:bg-slate-800 rounded-lg bg-slate-100">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Image
                src={dashboardPetImage}
                alt="dashboardUserImage"
                width={96}
                height={80}
                className="w-24 h-20 rounded-lg"
              />
            </div>
            <div>
              <div className="text-xl font-bold">My Total Pets</div>
              <div>
                <h4 className="text-xl pl-4 font-semibold">
                  <CountUp end={Number(totalPets)} duration={4}></CountUp>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 py-5">
        <div>
          <div className="hidden md:block dark:bg-slate-800 rounded-lg bg-slate-100 py-4">
            <LineChart
              xAxis={[
                {
                  data: [0, ...generateNumberArray(Number(totalPetsRequest))],
                },
              ]}
              series={[
                {
                  data: [0, ...generateNumberArray(Number(totalPets))],
                  area: true,
                },
              ]}
              height={400}
              grid={{ vertical: true, horizontal: true }}
            />
            <div className="mx-auto w-11/12 text-center text-xl font-bold my-10">
              Total Adoption Request VS. My Adopted Pets
            </div>
          </div>
          <div className="hidden sm:block md:hidden dark:bg-slate-800 rounded-lg bg-slate-100 py-4">
            <LineChart
              xAxis={[
                {
                  data: [0, ...generateNumberArray(Number(totalPetsRequest))],
                },
              ]}
              series={[
                {
                  data: [0, ...generateNumberArray(Number(totalPets))],
                  area: true,
                },
              ]}
              height={300}
              grid={{ vertical: true, horizontal: true }}
            />
            <div className="mx-auto w-11/12 text-center text-xl font-bold my-10">
              Total Adoption Request VS. My Adopted Pets
            </div>
          </div>
          <div className="block sm:hidden dark:bg-slate-800 rounded-lg bg-slate-100 py-4">
            <LineChart
              xAxis={[
                {
                  data: [0, ...generateNumberArray(Number(totalPetsRequest))],
                },
              ]}
              series={[
                {
                  data: [0, ...generateNumberArray(Number(totalPets))],
                  area: true,
                },
              ]}
              height={250}
              grid={{ vertical: true, horizontal: true }}
            />
            <div className="mx-auto w-11/12 text-center text-xl font-bold my-10">
              Total Adoption Request VS. My Adopted Pets
            </div>
          </div>
        </div>
        <div>
          <div className="hidden md:block dark:bg-slate-800 rounded-lg bg-slate-100 py-4">
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
              Total Adoption Request VS. Month
            </div>
          </div>
          <div className="hidden sm:block md:hidden dark:bg-slate-800 rounded-lg bg-slate-100 py-4">
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
              Total Adoption Request VS. Month
            </div>
          </div>
          <div className="block sm:hidden dark:bg-slate-800 rounded-lg bg-slate-100 py-4">
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
              Total Adoption Request VS. Month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
