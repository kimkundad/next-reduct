import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { connect, useDispatch, useSelector} from 'react-redux'
import { login, me } from '@/services/client-side'
import { loggedInSuccess, setAuthModal, setLoginForm} from '@/slices/authSlice'
import { useRouter } from 'next/router'

export default function LoginForm({ redirect }) {

    const dispatch = useDispatch()
    const router = useRouter()
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const onChangePhone = (e) => {
        setPhone(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const response = await login({
            phone: phone,
            password: password
        })
        const access_token = response.authorisation.token
        
        if (response.status != 'error') {

            const user = await me()
            dispatch(
                loggedInSuccess({
                user: user[0]
                })
            )
            dispatch(setAuthModal({ status: false, content: 'login' }))
            if (redirect) {
                router.push("/user_profile")
              }
        }
        setLoading(false)
    }

    return (
      <>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={4}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Phone number</FormLabel>
              <Input type="number" onChange={onChangePhone} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={onChangePassword}/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button onClick={handleSubmit} isLoading={loading}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      </>
    );
  }