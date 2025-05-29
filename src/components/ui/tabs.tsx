import {type ComponentPropsWithoutRef, useState} from "react";
import {TabContext, useTabContext} from "../../context/tab-context.ts";
import {twMerge} from "tailwind-merge";

type TabsComponentProps = ComponentPropsWithoutRef<'div'>;

const TabsComponent = ({className, children, ...rest}: TabsComponentProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const setActiveTab = (tabId: number) => setActiveTabIndex(tabId);

  return (
    <TabContext.Provider value={{ activeTabIndex, setActiveTab }}>
      <div
        {...rest}
        className={twMerge(
          '', className
        )}
      >
        {children}
      </div>
    </TabContext.Provider>
  )
}

type TabsListProps = ComponentPropsWithoutRef<'div'>;

const TabsList = ({className, children, ...rest}: TabsListProps) => {
  return (
    <div
      {...rest}
      className={twMerge(
        className, 'flex border-b border-gray-300'
      )}
    >
      {children}
    </div>
  )
}

interface TabsButtonProps extends ComponentPropsWithoutRef<'button'> {
  tabIndex: number;
}

const TabsButton = ({tabIndex, className, onClick, children, ...rest}: TabsButtonProps) => {
  const {activeTabIndex, setActiveTab} = useTabContext();
  const isActive = activeTabIndex === tabIndex;
  return (
    <button
      onClick={(e) => {
        onClick?.(e);
        setActiveTab(tabIndex);
      }}
      {...rest}
      type="button"
      className={twMerge(
        'min-h-9 text-sm rounded-t-lg border -mb-px flex items-center justify-center gap-2 px-4 py-1',
        className, isActive ? 'text-indigo-300 border-indigo-300' : 'border-gray-400 text-gray-400 hover:text-indigo-400',
      )}
    >
      {children}
    </button>
  )
}

interface TabsContentProps extends ComponentPropsWithoutRef<'div'> {
  tabIndex: number;
}

const TabsContent = ({tabIndex, className, children, ...rest}: TabsContentProps) => {
  const {activeTabIndex} = useTabContext();

  if (activeTabIndex !== tabIndex) return null;

  return (
    <div
      {...rest}
      className={twMerge(
        className, 'px-6 py-4'
      )}
    >
      {children}
    </div>
  );
}

export const Tabs = Object.assign(TabsComponent, {
  List: TabsList,
  Button: TabsButton,
  Content: TabsContent,
});