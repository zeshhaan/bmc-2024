import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Button from "./Button";

interface AlertDialogProps {
  icon: string;
  title: string;
  description: string;
  confirmButtonText: string;
  onClick: () => void;
}

const AlertDialogDemo = (props: AlertDialogProps) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <Button variant="ghost" icon={props.icon} size="md" />
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialog.Title className="text-black m-0 text-[17px] font-medium">
          {props.title}
        </AlertDialog.Title>
        <AlertDialog.Description className="text-black/70 mt-4 mb-5 text-[15px] leading-normal">
          {props.description}
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="text-black bg-gray-200 hover:bg-gray-300 focus:shadow-gray-400 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              onClick={props.onClick}
              className="text-red-600 bg-red-100 hover:bg-red-200 focus:shadow-red-200 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
            >
              {props.confirmButtonText}
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default AlertDialogDemo;
