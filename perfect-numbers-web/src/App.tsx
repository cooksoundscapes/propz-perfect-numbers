/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, FormErrorMessage, Input, Stack, Text, useToast } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"
import { getPerfectNumbersInRange, isPerfectNumber } from "./api";

function NumberInput({ value, onChange } : { value: number; onChange: (e: any) => void}) {
  return (
    <Input 
      type="number"
      value={value}
      onChange={onChange}
      maxW="6em"
      sx={{ fontSize: 22 }}
    >
      {isNaN(value) ?
        <FormErrorMessage>Invalid value, please insert a valid number</FormErrorMessage>
      : null}
    </Input>
  )
}

function App() {
  useEffect(() => {
    localStorage.setItem('chakra-ui-color-mode', 'dark')
  }, [])

  const [singleCheck, setSingleCheck] = useState({ value: 0, isPerfect: false })
  const [range, setRange] = useState({ from: 0, to: 0, numbers: '' })

  const toast = useToast()

  const checkIsPerfect = useCallback(() => {
    isPerfectNumber(singleCheck.value)
      .then(response => setSingleCheck(prev => ({ ...prev, isPerfect: response })))
      .catch(error => toast({
        title: "Error",
        description: error.message,
        status: 'error',
      }))
  }, [singleCheck.value, toast, setSingleCheck])

  const getPerfectNumberList = useCallback(() => {
    getPerfectNumbersInRange(range.from, range.to)
      .then(response => {
        setRange(prev => ({ ...prev, numbers: Array.isArray(response) ?response.join(", ") : '' }))
      })
      .catch(error => toast({
        title: "Error",
        description: error.message,
        status: 'error',
      }))
  }, [range.from, range.to, setRange, toast])

  return (
    <Stack
      maxW={800}
      marginLeft="auto"
      marginRight="auto"
      marginTop="10vh"
      h="70vh"
      border="1px solid white"
      borderRadius={16}
      textAlign="center"
      padding={8}
    >
      <Text as="h1" fontSize="5xl" marginBottom="1.5em">Is Your Number a Perfect Number?</Text>

      <Flex gap={2} alignItems="center" marginBottom="2em">
        <NumberInput
          value={singleCheck.value}
          onChange={(e) => setSingleCheck(prev => ({ ...prev, value: Number(e.target.value) }))}
        />
        <Button onClick={checkIsPerfect}>IS THIS A PERFECT NUMBER?</Button>
        <Text 
          fontSize="xl"
          color={singleCheck.isPerfect ? 'green' : 'tomato'}
        >
          {singleCheck.isPerfect ? "YES" : "NO"}
        </Text>
      </Flex>

      <Text fontSize="xl">Enter 2 numbers and discover the perfect numbers in between:</Text>
      <Flex gap={2}>
        <NumberInput 
          value={range.from}
          onChange={(e) => setRange(prev => ({ ...prev, from: Number(e.target.value)}))} 
        />
        <NumberInput 
          value={range.to}
          onChange={(e) => setRange(prev => ({ ...prev, to: Number(e.target.value)}))} 
        />
        <Button onClick={getPerfectNumberList}>Go!</Button>
      </Flex>
      <Text fontSize="3xl" color="sugar cookie">{'Result: ' + range.numbers}</Text>
    </Stack>
  )
}

export default App
