// Dependencies: pnpm install lucide-react

"use client";

import { Label } from "@/components/ui/label";
import { Check, ChevronDown } from "lucide-react";
import { Fragment, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const countries = [
  {
    continent: "Europe",
    items: [
      { value: "United Kingdom", flag: "🇬🇧" },
      { value: "France", flag: "🇫🇷" },
      { value: "Germany", flag: "🇩🇪" },
      { value: "Albania", flag: "🇦🇱" },
      { value: "Andorra", flag: "🇦🇩" },
      { value: "Armenia", flag: "🇦🇲" },
      { value: "Austria", flag: "🇦🇹" },
      { value: "Azerbaijan", flag: "🇦🇿" },
      { value: "Belarus", flag: "🇧🇾" },
      { value: "Belgium", flag: "🇧🇪" },
      { value: "Bosnia and Herzegovina", flag: "🇧🇦" },
      { value: "Bulgaria", flag: "🇧🇬" },
      { value: "Croatia", flag: "🇭🇷" },
      { value: "Cyprus", flag: "🇨🇾" },
      { value: "Czech Republic", flag: "🇨🇿" },
      { value: "Denmark", flag: "🇩🇰" },
      { value: "Estonia", flag: "🇪🇪" },
      { value: "Finland", flag: "🇫🇮" },
      { value: "Georgia", flag: "🇬🇪" },
      { value: "Greece", flag: "🇬🇷" },
      { value: "Hungary", flag: "🇭🇺" },
      { value: "Iceland", flag: "🇮🇸" },
      { value: "Ireland", flag: "🇮🇪" },
      { value: "Italy", flag: "🇮🇹" },
      { value: "Kazakhstan", flag: "🇰🇿" },
      { value: "Kosovo", flag: "🇽🇰" },
      { value: "Latvia", flag: "🇱🇻" },
      { value: "Liechtenstein", flag: "🇱🇮" },
      { value: "Lithuania", flag: "🇱🇹" },
      { value: "Luxembourg", flag: "🇱🇺" },
      { value: "Malta", flag: "🇲🇹" },
      { value: "Moldova", flag: "🇲🇩" },
      { value: "Monaco", flag: "🇲🇨" },
      { value: "Montenegro", flag: "🇲🇪" },
      { value: "Netherlands", flag: "🇳🇱" },
      { value: "North Macedonia", flag: "🇲🇰" },
      { value: "Norway", flag: "🇳🇴" },
      { value: "Poland", flag: "🇵🇱" },
      { value: "Portugal", flag: "🇵🇹" },
      { value: "Romania", flag: "🇷🇴" },
      { value: "Russia", flag: "🇷🇺" },
      { value: "San Marino", flag: "🇸🇲" },
      { value: "Serbia", flag: "🇷🇸" },
      { value: "Slovakia", flag: "🇸🇰" },
      { value: "Slovenia", flag: "🇸🇮" },
      { value: "Spain", flag: "🇪🇸" },
      { value: "Sweden", flag: "🇸🇪" },
      { value: "Switzerland", flag: "🇨🇭" },
      { value: "Turkey", flag: "🇹🇷" },
      { value: "Ukraine", flag: "🇺🇦" },
      { value: "Vatican City", flag: "🇻🇦" },
    ],
  },
  {
    continent: "America",
    items: [
      { value: "United States", flag: "🇺🇸" },
      { value: "Canada", flag: "🇨🇦" },
      { value: "Mexico", flag: "🇲🇽" },
      { value: "Antigua and Barbuda", flag: "🇦🇬" },
      { value: "Bahamas", flag: "🇧🇸" },
      { value: "Barbados", flag: "🇧🇧" },
      { value: "Belize", flag: "🇧🇿" },
      { value: "Bolivia", flag: "🇧🇴" },
      { value: "Brazil", flag: "🇧🇷" },
      { value: "Chile", flag: "🇨🇱" },
      { value: "Colombia", flag: "🇨🇴" },
      { value: "Costa Rica", flag: "🇨🇷" },
      { value: "Cuba", flag: "🇨🇺" },
      { value: "Dominica", flag: "🇩🇲" },
      { value: "Dominican Republic", flag: "🇩🇴" },
      { value: "Ecuador", flag: "🇪🇨" },
      { value: "El Salvador", flag: "🇸🇻" },
      { value: "Grenada", flag: "🇬🇩" },
      { value: "Guatemala", flag: "🇬🇹" },
      { value: "Guyana", flag: "🇬🇾" },
      { value: "Haiti", flag: "🇭🇹" },
      { value: "Honduras", flag: "🇭🇳" },
      { value: "Jamaica", flag: "🇯🇲" },
      { value: "Panama", flag: "🇵🇦" },
      { value: "Paraguay", flag: "🇵🇾" },
      { value: "Peru", flag: "🇵🇪" },
      { value: "Saint Kitts and Nevis", flag: "🇰🇳" },
      { value: "Saint Lucia", flag: "🇱🇨" },
      { value: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
      { value: "Suriname", flag: "🇸🇷" },
      { value: "Trinidad and Tobago", flag: "🇹🇹" },
      { value: "Uruguay", flag: "🇺🇾" },
      { value: "Venezuela", flag: "🇻🇪" },
    ],
  },
  {
    continent: "Africa",
    items: [
      { value: "South Africa", flag: "🇿🇦" },
      { value: "Nigeria", flag: "🇳🇬" },
      { value: "Morocco", flag: "🇲🇦" },
      { value: "Algeria", flag: "🇩🇿" },
      { value: "Angola", flag: "🇦🇴" },
      { value: "Benin", flag: "🇧🇯" },
      { value: "Botswana", flag: "🇧🇼" },
      { value: "Burkina Faso", flag: "🇧🇫" },
      { value: "Burundi", flag: "🇧🇮" },
      { value: "Cape Verde", flag: "🇨🇻" },
      { value: "Cameroon", flag: "🇨🇲" },
      { value: "Central African Republic", flag: "🇨🇫" },
      { value: "Chad", flag: "🇹🇩" },
      { value: "Comoros", flag: "🇰🇲" },
      { value: "Congo (Republic of the Congo)", flag: "🇨🇬" },
      { value: "Congo (Democratic Republic of the Congo)", flag: "🇨🇩" },
      { value: "Djibouti", flag: "🇩🇯" },
      { value: "Egypt", flag: "🇪🇬" },
      { value: "Equatorial Guinea", flag: "🇬🇶" },
      { value: "Eritrea", flag: "🇪🇷" },
      { value: "Eswatini", flag: "🇸🇿" },
      { value: "Ethiopia", flag: "🇪🇹" },
      { value: "Gabon", flag: "🇬🇦" },
      { value: "Gambia", flag: "🇬🇲" },
      { value: "Ghana", flag: "🇬🇭" },
      { value: "Guinea", flag: "🇬🇳" },
      { value: "Guinea-Bissau", flag: "🇬🇼" },
      { value: "Ivory Coast (Côte d'Ivoire)", flag: "🇨🇮" },
      { value: "Kenya", flag: "🇰🇪" },
      { value: "Lesotho", flag: "🇱🇸" },
      { value: "Liberia", flag: "🇱🇸" },
      { value: "Libya", flag: "🇱🇾" },
      { value: "Madagascar", flag: "🇲🇬" },
      { value: "Malawi", flag: "🇲🇼" },
      { value: "Mali", flag: "🇲🇱" },
      { value: "Mauritania", flag: "🇲🇷" },
      { value: "Mauritius", flag: "🇲🇺" },
      { value: "Morocco", flag: "🇲🇦" },
      { value: "Mozambique", flag: "🇲🇿" },
      { value: "Namibia", flag: "🇳🇦" },
      { value: "Niger", flag: "🇳🇪" },
      { value: "Rwanda", flag: "🇷🇼" },
      { value: "São Tomé and Príncipe", flag: "🇸🇹" },
      { value: "Senegal", flag: "🇸🇳" },
      { value: "Seychelles", flag: "🇸🇨" },
      { value: "Sierra Leone", flag: "🇸🇱" },
      { value: "Somalia", flag: "🇸🇴" },
      { value: "South Sudan", flag: "🇸🇸" },
      { value: "Sudan", flag: "🇸🇩" },
      { value: "Togo", flag: "🇹🇬" },
      { value: "Tunisia", flag: "🇹🇳" },
      { value: "Uganda", flag: "🇺🇬" },
      { value: "Zambia", flag: "🇿🇲" },
      { value: "Zimbabwe", flag: "🇿🇼" },
    ],
  },
  {
    continent: "Asia",
    items: [
      { value: "China", flag: "🇨🇳" },
      { value: "Japan", flag: "🇯🇵" },
      { value: "India", flag: "🇮🇳" },
      { value: "Afghanistan", flag: "🇦🇫" },
      { value: "Armenia", flag: "🇦🇲" },
      { value: "Azerbaijan", flag: "🇦🇿" },
      { value: "Bahrain", flag: "🇧🇭" },
      { value: "Bangladesh", flag: "🇧🇩" },
      { value: "Bhutan", flag: "🇧🇹" },
      { value: "Brunei", flag: "🇧🇳" },
      { value: "Cambodia", flag: "🇰🇭" },
      { value: "Cyprus", flag: "🇨🇾" },
      { value: "Georgia", flag: "🇬🇪" },
      { value: "Indonesia", flag: "🇮🇩" },
      { value: "Iraq", flag: "🇮🇶" },
      { value: "Israel", flag: "🇮🇱" },
      { value: "Jordan", flag: "🇯🇴" },
      { value: "Kazakhstan", flag: "🇰🇿" },
      { value: "Kuwait", flag: "🇰🇼" },
      { value: "Kyrgyzstan", flag: "🇰🇬" },
      { value: "Laos", flag: "🇱🇦" },
      { value: "Lebanon", flag: "🇱🇧" },
      { value: "Malaysia", flag: "🇲🇾" },
      { value: "Maldives", flag: "🇲🇻" },
      { value: "Mongolia", flag: "🇲🇳" },
      { value: "Myanmar", flag: "🇲🇲" },
      { value: "Nepal", flag: "🇳🇵" },
      { value: "North Korea", flag: "🇰🇵" },
      { value: "Oman", flag: "🇴🇲" },
      { value: "Pakistan", flag: "🇵🇰" },
      { value: "Philippines", flag: "🇵🇭" },
      { value: "Qatar", flag: "🇶🇦" },
      { value: "Russia", flag: "🇷🇺" },
      { value: "Saudi Arabia", flag: "🇸🇦" },
      { value: "Singapore", flag: "🇸🇬" },
      { value: "South Korea", flag: "🇰🇷" },
      { value: "Sri Lanka", flag: "🇱🇰" },
      { value: "Syria", flag: "🇸🇾" },
      { value: "Tajikistan", flag: "🇹🇯" },
      { value: "Thailand", flag: "🇹🇭" },
      { value: "Timor-Leste", flag: "🇹🇱" },
      { value: "Turkey", flag: "🇹🇷" },
      { value: "Turkmenistan", flag: "🇹🇲" },
      { value: "United Arab Emirates", flag: "🇦🇪" },
      { value: "Uzbekistan", flag: "🇺🇿" },
      { value: "Vietnam", flag: "🇻🇳" },
      { value: "Yemen", flag: "🇾🇪" },
    ],
  },

  {
    continent: "Oceania",
    items: [
      { value: "Australia", flag: "🇦🇺" },
      { value: "New Zealand", flag: "🇳🇿" },
      { value: "Fiji", flag: "🇫🇯" },
      { value: "Papua New Guinea", flag: "🇵🇬" },
      { value: "Solomon Islands", flag: "🇸🇧" },
      { value: "Vanuatu", flag: "🇻🇺" },
      { value: "Samoa", flag: "🇼🇸" },
      { value: "Tonga", flag: "🇹🇴" },
      { value: "Kiribati", flag: "🇰🇮" },
      { value: "Marshall Islands", flag: "🇲🇭" },
      { value: "Palau", flag: "🇵🇼" },
      { value: "Nauru", flag: "🇳🇷" },
      { value: "Tuvalu", flag: "🇹🇻" },
      { value: "Federated States of Micronesia", flag: "🇫🇲" },
    ],
  },
];

type Props = {
  name: string;
};
export default function CountrySelectList(props: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  return (
    <div className="space-y-2">
      {/* we've created this dom because form can not access to the useState hooks value */}
      <input className="hidden" value={value} name={props.name} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="select-44"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
          >
            {value ? (
              <span className="flex min-w-0 items-center gap-2">
                <span className="text-lg leading-none">
                  {
                    countries
                      .map((group) =>
                        group.items.find((item) => item.value === value),
                      )
                      .filter(Boolean)[0]?.flag
                  }
                </span>
                <span className="truncate">{value}</span>
              </span>
            ) : (
              <span className="text-muted-foreground">Select country</span>
            )}
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              {countries.map((group) => (
                <Fragment key={group.continent}>
                  <CommandGroup heading={group.continent}>
                    {group.items.map((country) => (
                      <CommandItem
                        key={country.value}
                        value={country.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue);
                          setOpen(false);
                        }}
                      >
                        <span className="text-lg leading-none">
                          {country.flag}
                        </span>{" "}
                        {country.value}
                        {value === country.value && (
                          <Check
                            size={16}
                            strokeWidth={2}
                            className="ml-auto"
                          />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Fragment>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
