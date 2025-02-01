import { IconButton } from '@chakra-ui/button'
import { Box, Flex, Heading, VStack } from '@chakra-ui/layout'
import { Tooltip } from '@chakra-ui/tooltip'
import Link from 'next/link'
import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import { useMenus } from '@/_hooks/useMenus'

export const DesktopMenu: React.FC<{
  onLogout: () => void
}> = ({ onLogout }) => {
  const menus = useMenus()

  const activeStyle = (active: boolean) => {
    if (active) {
      return {
        variant: 'solid',
        boxShadow: 'lg',
      }
    }
    return {
      variant: 'ghost',
    }
  }

  return (
    <Flex
      as="aside"
      h="full"
      flexShrink={0}
      flexBasis="100px"
      align="center"
      justify="space-between"
      direction="column"
      py="40px"
      pos="fixed"
      left={6}
      top={0}
    >
      <Heading as="h2" fontSize="3xl" fontWeight="bold" color="orange.500">
        S.
      </Heading>
      <VStack>
        {menus.map((menu) => (
          <Tooltip label={menu.label} placement="right" key={menu.link}>
            <Link href={menu.link} key={menu.link}>
              <IconButton
                fontSize="3xl"
                icon={menu.icon}
                aria-label={`${menu.label} menu`}
                w="50px"
                h="50px"
                borderRadius="xl"
                {...activeStyle(menu.isActive)}
              />
            </Link>
          </Tooltip>
        ))}
      </VStack>
      <Box>
        <Tooltip label="Logout" placement="right">
          <IconButton
            fontSize="3xl"
            icon={<BiLogOut />}
            aria-label="Logout menu"
            w="50px"
            h="50px"
            borderRadius="xl"
            variant="ghost"
            onClick={onLogout}
          />
        </Tooltip>
      </Box>
    </Flex>
  )
}
