import { PawPrintIcon as Paw, ClipboardList, Home, Radio } from 'lucide-react'
import React from 'react'

interface ServiceProps {
  icon: React.ReactNode
  title: string
  description: string
}

function ServiceCard({ icon, title, description }: ServiceProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 text-amber-500">
        {React.cloneElement(icon as React.ReactElement, { size: 48, strokeWidth: 1.5 })}
      </div>
      <h3 className="mb-4 text-xl font-bold uppercase tracking-wider ">
        {title}
      </h3>
      <p >
        {description}
      </p>
    </div>
  )
}

export default function ServicesSection() {
  const services = [
    {
      icon: <Paw />,
      title: "Rescuing Pets",
      description: "Pets arrive in our care from a wide variety of situations. Some are rescued from municipal shelters as strays; others are surrendered to our care due to no fault of their own; and some are rescued from neglect or abuse situations."
    },
    {
      icon: <ClipboardList />,
      title: "Behavior Assessment",
      description: "Often, behavior changes are the result of changes in the pet's living environment or unknown medical needs. Our behavior assessment helps identify changes in order to retain family and pet bonds and reduce rehoming."
    },
    {
      icon: <Home />,
      title: "Finding Pets a Home",
      description: "Our adoption team works diligently to match pets with families. Our behavior assessment team gets to know the pet thoroughly and matches accordingly. Often, we receive multiple adoption applications for highly adoptable pets."
    },
    {
      icon: <Radio />,
      title: "Microchipping",
      description: "Microchipping your pet is the best way to ensure that if your pet ever gets lost, finders will be able to reunite you with your pet. It is important to register your chip right away and update immediately if your information changes."
    }
  ]

  return (
    <section className="dark:bg-slate-800 bg-slate-100 py-10 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h3 className="mt-2 text-4xl font-bold md:text-4xl">Our Services</h3>
        </div>
        <div className="grid gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-12">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

