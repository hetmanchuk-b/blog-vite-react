import type {PropsWithChildren} from "react";
import {type ModalProps} from "../../hooks/use-modal.tsx";
import {Portal} from "../containers/portal.tsx";
import {twMerge} from "tailwind-merge";

type ModalComponentProps = PropsWithChildren<ModalProps>

export const Modal = ({children, ...layoutProps}: ModalComponentProps) => {
  return (
    <ModalLayout {...layoutProps}>
      {children}
    </ModalLayout>
  );
};

type ModalLayoutProps = PropsWithChildren<ModalProps>

const ModalLayout = ({children, isOpen, onClose, animation}: ModalLayoutProps) => {
  if (!isOpen) return null;
  return (
    <Portal target="modals-root">
      <dialog
        className={twMerge(
          'h-screen w-screen bg-neutral-300/30 backdrop-blur-xs fixed z-100 inset-0 flex justify-center items-center',
          animation === 'out' ? 'animate-modal-wrapper-out' : 'animate-modal-wrapper-in'
        )}
        onClick={onClose}
      >
        <div
          className="bg-neutral-800 text-neutral-100 p-4 rounded-lg shadow-xl max-w-2xl w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </dialog>
    </Portal>
  )
}
