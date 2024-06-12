import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "@iconify/react";
import Button from "./Button";
import type { FormEvent } from "react";

interface DialogProps {
  triggerButton: {
    variant?: string;
    icon?: string;
    size: string;
    label: string;
  };
  modalTitle: string;
  modalDescription?: string;
  children: React.ReactNode;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const DialogDemo = (props: DialogProps) => (
  <Dialog.Root open={props.isDialogOpen} onOpenChange={props.setIsDialogOpen}>
    <Dialog.Trigger asChild>
      <Button
        variant={props.triggerButton.variant}
        icon={props.triggerButton.icon}
        size={props.triggerButton.size}
      >
        {props.triggerButton.label}
      </Button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-black m-0 text-[17px] font-medium">
          {props.modalTitle}
        </Dialog.Title>
        <Dialog.Description className="text-black/70 mt-[10px] mb-5 text-[15px] leading-normal">
          {props.modalDescription}
        </Dialog.Description>
        {props.children}
        <Dialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Icon icon="material-symbols-light:close-rounded" />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;
