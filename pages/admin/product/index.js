import Admin from "../../../layouts/Admin";
import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import { useRef, useState, Fragment } from "react";
import instance from "../../../utils/instance";
import { Field, Form, Formik } from "formik";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product({ products, category }) {
  const router = useRouter();
  const { query } = useRouter();
  const FormikRef = useRef();
  const initialValues = {
    search: query.search || "",
    category: query.category || "",
  };
  const [selectCategory, setselectCategory] = useState(category[3]);

  const onSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 1000));
    router.push({
      href: "admin/product",
      query: {
        search: values.search,
        category: selectCategory.category_name,
      },
    });
  };

  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          innerRef={FormikRef}
        >
          {({ values }) => (
            <Form>
              <div className="mt-4 grid grid-cols-2 items-center">
                <div className="flex flex-col">
                  <Field
                    id="search"
                    className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    type="search"
                    name="search"
                    placeholder="Search Products..."
                  />
                </div>
                <div className="flex flex-col">
                  <Listbox value={selectCategory} onChange={setselectCategory}>
                    {({ open }) => (
                      <>
                        <Listbox.Label className="block text-sm font-medium text-gray-700">
                          Category
                        </Listbox.Label>
                        <div className="mt-1 relative">
                          <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
                            <span className="flex items-center">
                              <span className="ml-3 block truncate">
                                {selectCategory.category_name}
                              </span>
                            </span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {category.map((item) => (
                                <Listbox.Option
                                  key={item.id}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "text-white bg-green-600"
                                        : "text-gray-900",
                                      "cursor-default select-none relative py-2 pl-3 pr-9"
                                    )
                                  }
                                  value={item}
                                >
                                  {({ selectCategory, active }) => (
                                    <>
                                      <div className="flex items-center">
                                        <span
                                          className={classNames(
                                            selectCategory
                                              ? "font-semibold"
                                              : "font-normal",
                                            "ml-3 block truncate"
                                          )}
                                        >
                                          {item.category_name}
                                        </span>
                                      </div>

                                      {selectCategory ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? "text-white"
                                              : "text-green-600",
                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                          )}
                                        >
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </Form>
          )}
        </Formik>
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {products.data.length === 0
            ? "Data not found"
            : products.data.map((item) => (
                <div
                  key={item.id}
                  className="hover:shadow-lg cursor-pointer transition-all delay-75 bg-white border border-gray-200 p-4 my-4 lg:m-4 rounded"
                >
                  <h3 className="text-gray-800 font-bold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-600 text-right">
                    {item.category.category_name}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await instance.get(`api/products`, {
    params: {
      search: context.query.search,
      category: context.query.category,
    },
  });
  const products = res.data.data;
  console.log(context.query.search);
  const resCategory = await instance.get("api/category");
  const category = resCategory.data.data;
  return {
    props: { products, category }, // will be passed to the page component as props
  };
}

Product.layout = Admin;
