import { Box, FormControl, FormLabel, Input, Stack, Select as ChakraSelect, Text } from "@chakra-ui/react";

const RenderBedrooms = ({ type, fields, register }: any) => (
  <Box mt={5}>
    {!!type &&
      type !== "studio" &&
      type !== "single room" &&
      fields.length > 0 && <Text>{`Bedrooms(${type})`}</Text>}
    {fields.length > 0 &&
      fields.map((field: any, itemIndex: number) => (
        <Stack direction="row" align="center" key={field.id}>
          <FormControl>
            <FormLabel>Bedroom Number</FormLabel>
            <Input
              {...register(
                `bedrooms.${itemIndex}.bedroomNumber`
              )}
              size="sm"
              disabled
              type="number"
              defaultValue={field.bedroomNumber}
            />
          </FormControl>
          <FormControl>
            <FormLabel>en-Suite</FormLabel>
            <ChakraSelect
              size="sm"
              {...register(
                `bedrooms.${itemIndex}.enSuite`
              )}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </ChakraSelect>
          </FormControl>
          <FormControl>
            <FormLabel>Master</FormLabel>
            <ChakraSelect
              size="sm"
              {...register(
                `bedrooms.${itemIndex}.master`
              )}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </ChakraSelect>
          </FormControl>
        </Stack>
      ))}
  </Box>
);

export default RenderBedrooms
