import { useRouter } from "next/router";
import { api } from "@/utils/api";
import Image from 'next/image'

import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import Layout from "@/components/layouts/Layout";
import { Button, Color } from "@/components/Button";

const venuePlaceholder = {
  images: [
    {
      id: 1,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
      alt: 'Consectetur mollit ipsum qui eu culpa aliquip aliquip cillum reprehenderit qui mollit ut.',
    },
  ],
  details: [
    {
      name: 'Details',
      items: [
        'Anim cupidatat ex excepteur aliqua do.',
        'Non fugiat exercitation mollit quis sit veniam aute esse voluptate duis aliqua adipisicing incididunt reprehenderit.',
        'In nostrud est labore cillum voluptate cillum mollit id dolor tempor.',
        'Labore non ex consequat do ut sunt sint incididunt nostrud nostrud adipisicing sit id elit.',
      ],
    },
    {
      name: 'Directions',
      items: [
        'Anim cupidatat ex excepteur aliqua do.',
        'Non fugiat exercitation mollit quis sit veniam aute esse voluptate duis aliqua adipisicing incididunt reprehenderit.',
        'In nostrud est labore cillum voluptate cillum mollit id dolor tempor.',
        'Labore non ex consequat do ut sunt sint incididunt nostrud nostrud adipisicing sit id elit.',
      ],
    },
  ],
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function VenuePage() {
  const id = useRouter().query.id as string;
  const {data: venue} = api.venue.getById.useQuery({id})

  if (!venue) {
    return (
      <>loading</>
    )
  }
  return (
    <Layout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {venuePlaceholder.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only"> {image.name} </span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <Image
                              src={image.src}
                              alt={image.name}
                              fill
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-indigo-500" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                {venuePlaceholder.images.map((image) => (
                  <Tab.Panel key={image.id}>
                    <Image
                      src={image.src}
                      alt={image.name}
                      fill
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Venue info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {venue.title}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Venue information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {venue.seats} seats
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: venue.description }}
                />
              </div>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  {venuePlaceholder.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                              <span
                                className={classNames(
                                  open ? "text-indigo-600" : "text-gray-900",
                                  "text-sm font-medium"
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="prose prose-sm pb-6"
                          >
                            <ul role="list">
                              {detail.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>


              <section aria-labelledby="book-venue" className="mt-12">
                <Button color={Color.BLUE} href={`/book/${venue.id}`}>Book venue</Button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
