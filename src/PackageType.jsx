import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const packages = [
  {
    id: 1,
    package: "Exotic Shorthair",
    avatar: "src/assets/exotic-shorthair-cat.png",
    description: "Wagyu, Seafood, Pork and Chicken",
    adultPrice: 79,
    childPrice: 59,
  },
  {
    id: 2,
    package: "British Shorthair",
    avatar: "src/assets/british-shorthair-cat.png",
    description: "Seafood, Beef, Pork and Chicken",
    adultPrice: 59,
    childPrice: 39,
  },
  {
    id: 3,
    package: "Scottish Fold",
    avatar: "src/assets/scottish-fold-cat.png",
    description: "Seafood, Pork and Chicken",
    adultPrice: 49,
    childPrice: 29,
  },
];

const seatsNum = (selectedTable) => {
  if (selectedTable >= 6 && selectedTable <= 15) {
    return "2-4";
  }
  return "6-8";
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PackageType = ({ selectedTable }) => {
  const [selected, setSelected] = useState(packages[1]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="flex flex-col mt-4 justify-center rounded-md bg-yellow-50 px-4 py-1.5 font-medium text-orange ring-1 shadow-sm ring-inset ring-orange-300">
            <span className="text-lg flex items-center justify-center py-1">
              {`Table ${selectedTable} | ${seatsNum(selectedTable)} people`}
            </span>
          </div>
          <Listbox.Label className="block mt-4 text-sm font-medium leading-6 text-gray-900">
            Package Type:
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <img src={selected.avatar} alt="" className="h-5 w-5" />
                <span className="ml-3 block truncate">{selected.package}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition transform duration-300 ease-out"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition transform duration-200 ease-in"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Listbox.Options className="absolute w-full z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {packages.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-orange text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={item.avatar} alt="" className="h-5 w-5" />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {item.package}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-orange",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
            <div className="flex flex-col mt-4 justify-center rounded-md bg-yellow-50 px-4 py-1.5 font-medium text-orange ring-1 shadow-sm ring-inset ring-orange-300">
              <span className="py-1 border-b-2 border-orange-100">
                {selected.description}
                <br></br>
              </span>
              RM {selected.adultPrice} - Adult Price (Over 140cm)<br></br>RM{" "}
              {selected.childPrice} - Child Price (120cm - 140cm)
            </div>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default PackageType;
