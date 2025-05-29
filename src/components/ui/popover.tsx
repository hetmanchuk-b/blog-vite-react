import {type ComponentPropsWithoutRef, useState} from "react";
import {twMerge} from "tailwind-merge";
import {PopoverContext, usePopoverContext} from "../../hooks/popover-context.tsx";
import {useDetectClickOutside} from "../../hooks/use-detect-click-outside.ts";
import { Icons } from "../icons.tsx";

type PopoverComponentProps = ComponentPropsWithoutRef<'div'>

const PopoverComponent = ({className, children, ...rest}: PopoverComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useDetectClickOutside({
    onTriggered: () => {
      onClose();
    }
  })

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <PopoverContext.Provider value={{ isOpen, onOpen, onClose }}>
      <div ref={ref} className={twMerge('relative', className)} {...rest}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

type PopoverButtonProps = ComponentPropsWithoutRef<'button'>;

const PopoverButton = ({className, children, onClick, ...rest}: PopoverButtonProps) => {
  const {onOpen, isOpen, onClose} = usePopoverContext();
  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e);
        if (isOpen) {
          onClose();
          return
        }
        onOpen();
      }}
      {...rest}
      className={twMerge(
        'font-medium w-full relative z-20 px-3 flex items-center justify-center gap-2 rounded-lg bg-neutral-700 h-10',
        className
      )}>
      <span>{children}</span>
      <Icons.chevronDown className={twMerge(
        'size-5 transition-transform',
        isOpen && '-scale-y-100'
      )} />
    </button>
  )
}

type PopoverListProps = ComponentPropsWithoutRef<'div'>;

const PopoverList = ({className, children, ...rest}: PopoverListProps) => {
  const {isOpen} = usePopoverContext();

  if (!isOpen) return null;

  return (
    <div
      className={twMerge('absolute z-10 top-[calc(100%-5px)] pt-[5px] left-0 bg-neutral-700 rounded-b-lg text-white w-full shadow-md max-h-50 overflow-auto blog-scrollbar', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

type PopoverListItemProps = ComponentPropsWithoutRef<'div'>;

const PopoverListItem = ({className, children, onClick, ...rest}: PopoverListItemProps) => {
  const {onClose} = usePopoverContext();

  return (
    <div
      className={twMerge('cursor-pointer px-2 py-1 min-h-9 font-medium hover:bg-neutral-600 flex items-center justify-start gap-2 text-sm leading-tight', className)}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        onClose();
      }}
    >
      {children}
    </div>
  )
}

type PopoverSeparatorProps = ComponentPropsWithoutRef<'div'>;

const PopoverSeparator = ({className, ...rest}: PopoverSeparatorProps) => {
  return (
    <div
      {...rest}
      className={twMerge(
        className, 'h-0.5 w-full bg-neutral-300 my-1.5'
      )}
    />
  )
}

export const Popover = Object.assign(PopoverComponent, {
  Button: PopoverButton,
  List: PopoverList,
  ListItem: PopoverListItem,
  Separator: PopoverSeparator,
});