import { Portal } from "@ark-ui/react/portal";
import { Select as ArkSelect, SelectRootProps } from "@ark-ui/react/select";
import { LuChevronDown, LuCheck } from "react-icons/lu";
import { SelectItem } from "../types";

type Props = SelectRootProps<SelectItem> & {
  label: string;
};

export function Select(props: Props) {
  const { label, collection, ...rest } = props;

  return (
    <ArkSelect.Root
      positioning={{ sameWidth: true }}
      collection={collection}
      {...rest}
    >
      <ArkSelect.Label className="text-base">{label}</ArkSelect.Label>
      <ArkSelect.Control>
        <ArkSelect.Trigger className="inline-flex h-10 w-full min-w-10 items-center justify-between gap-1 bg-[#403e41] px-4">
          <ArkSelect.ValueText />
          <ArkSelect.Indicator>
            <LuChevronDown />
          </ArkSelect.Indicator>
        </ArkSelect.Trigger>
      </ArkSelect.Control>
      <Portal>
        <ArkSelect.Positioner>
          <ArkSelect.Content className="hidden:hidden bg-[#2d2a2e] p-1 shadow-sm">
            <ArkSelect.ItemGroup>
              {collection.items.map((item) => (
                <ArkSelect.Item
                  key={item.value}
                  item={item}
                  className="flex h-10 cursor-pointer items-center justify-between bg-[#403e41] px-2 text-[#727072] hover:bg-[#5b595c] data-[disabled=]:cursor-not-allowed data-[state=checked]:text-[#fcfcfa] data-[disabled=]:opacity-50"
                >
                  <ArkSelect.ItemText>{item.label}</ArkSelect.ItemText>
                  <ArkSelect.ItemIndicator>
                    <LuCheck color="#ffd866" />
                  </ArkSelect.ItemIndicator>
                </ArkSelect.Item>
              ))}
            </ArkSelect.ItemGroup>
          </ArkSelect.Content>
        </ArkSelect.Positioner>
      </Portal>
      <ArkSelect.HiddenSelect />
    </ArkSelect.Root>
  );
}
