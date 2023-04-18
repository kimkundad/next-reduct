import React, { useCallback } from "react";
import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex  } from '@chakra-ui/react'
import { FcAssistant, FcDonate, FcInTransit, FcBusinessman } from 'react-icons/fc';
import {
    BottomNavigation,
    BottomNavigationItem,
    BottomNavigationIcon,
    BottomNavigationLabel,
    BottomNavigationStyleConfig
  } from "chakra-ui-bottom-navigation";

import { useRouter } from "next/router";


export default function Footer() {

    const router = useRouter();

    const handleChange = useCallback(
        (path) => {
          router.push(path);
        },
        [router.push]
      );
    return (
      <>
        <Box className="main-footer-b" b={0} pos="fixed" w='100%' >
            <Box className='chakra-container-header'>
                <Box className='box-footer' bg="#f6f8fa" border='1px' borderColor='gray.200'>
                <BottomNavigation value={router.pathname} onChange={handleChange} >
                    <Flex >
                    <BottomNavigationItem value="/" w='100%' pt="10px" pb="10px">
                        <BottomNavigationIcon as={FcAssistant} h="30px" w="30px"/>
                        <BottomNavigationLabel>Home</BottomNavigationLabel>
                    </BottomNavigationItem>

                    <BottomNavigationItem value="/search" w='100%'>
                        <BottomNavigationIcon as={FcDonate} h="30px" w="30px"/>
                        <BottomNavigationLabel>Search</BottomNavigationLabel>
                    </BottomNavigationItem>

                    <BottomNavigationItem value="/favorites" w='100%'>
                        <BottomNavigationIcon as={FcInTransit} h="30px" w="30px"/>
                        <BottomNavigationLabel>Favorites</BottomNavigationLabel>
                    </BottomNavigationItem>

                    <BottomNavigationItem value="/register" w='100%'>
                        <BottomNavigationIcon as={FcBusinessman} h="30px" w="30px"/>
                        <BottomNavigationLabel>Register</BottomNavigationLabel>
                    </BottomNavigationItem>

                    </Flex>
                </BottomNavigation>
                </Box>
            </Box>
        </Box>
      </>
    )
  }