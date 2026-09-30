import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Menu, MoveRight, X } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons';
import { motion } from 'motion/react';
import { useState } from 'react';
import { SERVICES, waLink } from '@/data';
import { ThemeToggle } from '@/components/ThemeToggle';
import logo from '@/assets/logo.png';

function Header1() {
  const waOrder = waLink();

  const navigationItems = [
    {
      title: 'Home',
      href: '#top',
      description: '',
    },
    {
      title: 'Layanan',
      description: 'Semua urusan titip, antar & antre, beres.',
      items: SERVICES.map((s) => ({ title: s.title, href: '#layanan', Icon: s.icon })),
    },
    {
      title: 'Bantuan',
      description: 'Cara order, ongkir transparan, dan FAQ.',
      items: [
        { title: 'Cara Order', href: '#cara' },
        { title: 'Cek Ongkir', href: '#ongkir' },
        { title: 'Testimoni', href: '#testimoni' },
        { title: 'FAQ', href: '#faq' },
      ],
    },
  ];

  const [isOpen, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full z-40 fixed top-0 left-0 bg-background border-b border-border/60 backdrop-blur"
    >
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row items-center px-4">
        <div className="flex justify-start items-center min-w-0 shrink-0">
          <img src={logo} alt="Logo UrusinAja.id" className="h-16 w-auto shrink-0" draggable={false} />
        </div>
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <NavigationMenuLink href={item.href}>
                      <Button variant="ghost">{item.title}</Button>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                            <a href={waOrder} target="_blank" rel="noreferrer">
                              <Button size="sm" className="mt-10">
                                Order via WA
                              </Button>
                            </a>
                          </div>
                          <div className="flex flex-col text-sm h-full justify-end">
                            {item.items?.map((subItem) => {
                              const SubIcon = 'Icon' in subItem ? subItem.Icon : undefined;
                              return (
                                <NavigationMenuLink
                                  href={subItem.href}
                                  key={subItem.title}
                                  className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                >
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>{SubIcon ? <SubIcon size={15} /> : null}{subItem.title}</span>
                                  <MoveRight className="w-4 h-4 text-muted-foreground" />
                                </NavigationMenuLink>
                              );
                            })}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex justify-end w-full gap-2">
          <span className="hidden lg:inline-flex">
            <ThemeToggle />
          </span>
          <a href="#ongkir" className="hidden md:inline-flex">
            <Button variant="ghost">Cek ongkir</Button>
          </a>
          <div className="border-r hidden md:inline"></div>
          <a href="#cara" className="hidden md:inline-flex">
            <Button variant="outline">Cara order</Button>
          </a>
          <a href={waOrder} target="_blank" rel="noreferrer" className="shrink-0">
            <Button className="max-sm:h-9 max-sm:px-3 max-sm:text-[13px]"><WhatsappIcon size={16} /> Order Sekarang</Button>
          </a>
        </div>
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8 px-4 rounded-b-2xl max-h-[calc(100dvh-5.5rem)] overflow-y-auto z-50">
              <div className="flex items-center justify-between">
                <span className="text-lg">Mode gelap</span>
                <ThemeToggle />
              </div>
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex justify-between items-center"
                      >
                        <span className="text-lg">{item.title}</span>
                        <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                      </a>
                    ) : (
                      <p className="text-lg">{item.title}</p>
                    )}
                    {item.items &&
                      item.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.href}
                          onClick={() => setOpen(false)}
                          className="flex justify-between items-center"
                        >
                          <span className="text-muted-foreground">
                            {subItem.title}
                          </span>
                          <MoveRight className="w-4 h-4 stroke-1" />
                        </a>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}

export { Header1 };
export { Header1 as Header };
