/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Center, Flex, FormErrorMessage, Input, Spinner, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getPerfectNumbersInRange, isPerfectNumber } from "./api";
import { useQuery } from "./useQuery";

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

  const [singleCheck, setSingleCheck] = useState(0)
  const [range, setRange] = useState({ from: 0, to: 0 })
  const [singleTrigger, singleCheckResult] = useQuery(isPerfectNumber)
  const [rangeTrigger, rangeResult] = useQuery(getPerfectNumbersInRange)

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
          value={singleCheck}
          onChange={(e) => setSingleCheck(Number(e.target.value))}
        />
        <Button onClick={() => singleTrigger(singleCheck)}>IS THIS A PERFECT NUMBER?</Button>
        {singleCheckResult.isLoading ? <Spinner /> :
          <Text 
            fontSize="xl"
            color={singleCheckResult?.result ? 'green' : 'tomato'}
          >
            {singleCheckResult?.result ? "YES" : "NO"}
          </Text>
        }
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
        <Button onClick={() => rangeTrigger(range.from, range.to)}>Go!</Button>
      </Flex>
      {rangeResult.isLoading ? <Center><Spinner /></Center> : 
        <Text fontSize="3xl" color="sugar cookie">
        {rangeResult.result ? 'Result: ' + rangeResult.result?.join(', ') : ''}
        </Text>
      }
    </Stack>
  )
}

export default App
