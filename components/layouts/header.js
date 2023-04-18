import React from 'react'
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  Text
} from '@chakra-ui/react';
import logo from '@/public/img/logo-shopee.png'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import logout from '@/services/logout'
import { useRouter } from 'next/router'

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Header() {

  const [loading, setLoading] = React.useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account, isLoggedIn } = useSelector((state) => state.auth)
  const router = useRouter()
  
  const handleLogout = async (e) => {
    e.preventDefault()
    setLoading(true)
    const loggedOut = await logout()
    if (loggedOut.message == 'Successfully logged out') {
        await router.push('/login')
    }
    setLoading(false)
}


  return (
    <>
      <Box className='fixed_header' >
        <Box className='chakra-container-header'>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} w='100'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Image src={logo.src} alt='Logo website' h="45" />

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                  {isLoggedIn ? (
                    <p>{account[0]?.phone}</p>
                  ):(
                    <p>Username</p>
                  )}
                  </Center>
                  <br />
                  <MenuDivider />
                  {isLoggedIn ? (
                  <MenuItem onClick={handleLogout} >Logout</MenuItem>
                  ):(
                  <MenuItem>Login</MenuItem>
                  )}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      </Box>
      </Box>
    </>
  )
}