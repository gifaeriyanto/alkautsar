import {
  Box,
  Link as CLink,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useRef } from 'react'
import { BiLogOut, BiMenu } from 'react-icons/bi'
import { useMenus } from '@/_hooks/useMenus'

export const MobileMenu: React.FC<{ onLogout: () => void }> = ({
  onLogout,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navToggleRef = useRef<HTMLButtonElement>(null)

  const menus = useMenus()

  return (
    <>
      <IconButton
        icon={<BiMenu />}
        aria-label="Nav toggle"
        pos="fixed"
        top="40px"
        right="20px"
        fontSize="xl"
        w="40px"
        h="40px"
        borderRadius="lg"
        zIndex="1"
        onClick={onOpen}
        ref={navToggleRef}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={navToggleRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color="orange.500">logo</DrawerHeader>

          <DrawerBody>
            {menus.map((menu) => (
              <Link href={menu.link} key={menu.link}>
                <Flex
                  align="center"
                  justify="space-between"
                  p={2}
                  my={2}
                  mx={-2}
                  borderRadius="md"
                  bgColor={menu.isActive ? 'orange.500' : undefined}
                  color={menu.isActive ? 'white' : undefined}
                  onClick={onClose}
                >
                  <Text as="span">{menu.label}</Text>
                  <Text as="span" fontSize="lg">
                    {menu.icon}
                  </Text>
                </Flex>
              </Link>
            ))}

            <CLink onClick={onLogout}>
              <Flex
                align="center"
                justify="space-between"
                p={2}
                my={2}
                mx={-2}
                borderRadius="md"
                onClick={onClose}
              >
                <Text as="span">Logout</Text>
                <Text as="span" fontSize="lg">
                  <BiLogOut />
                </Text>
              </Flex>
            </CLink>
          </DrawerBody>

          <DrawerFooter>
            <Box color="blackAlpha.500" mt={6} textAlign="right">
              &copy; copyright WIM {new Date().getFullYear()}
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
