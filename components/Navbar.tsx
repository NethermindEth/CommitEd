import { ReactNode } from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Heading,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} width={"100%"}>
        <Flex justifyContent={"center"} width={"100%"}>
          <Flex
            h={"auto"}
            p={"10px"}
            direction={{ base: "column", md: "row" }}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Flex alignItems={"center"}>
              <Image alt="Nethermind logo" src={"/logo.svg"} maxHeight={"30px"} />
              <Heading variant={"h3"} fontSize={"xl"}>
                Commit-Ed
              </Heading>
            </Flex>

            <Flex alignItems={"center"}>
              <Stack direction={{ base: "column", md: "row" }} spacing={3}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>

                {/* <Menu>
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
                            <p>Username</p>
                        </Center>
                        <br />
                        <MenuDivider />
                        <MenuItem>Your Servers</MenuItem>
                        <MenuItem>Account Settings</MenuItem>
                        <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu> */}
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
