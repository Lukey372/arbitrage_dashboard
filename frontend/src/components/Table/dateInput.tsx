import { Input, Stack } from "@chakra-ui/react";
import { isAfter } from "date-fns";

export default function DateInput(props: {
  dateFrom: string;
  setDateFrom: any;
  dateTo: string;
  setDateTo: any;
}) {
  const { dateFrom, setDateFrom, dateTo, setDateTo } = props;

  const handleDateFromChange = (event: any) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event: any) => {
    setDateTo(event.target.value);
  };

  

  return (
    <Stack
      width="fit-content"
      gap="0.1rem"
      direction={{ base:"column",sm: "row", md: "row", lg: "row" }}
    >
      <Input
        placeholder="Select Date and Time"
        backgroundColor={"white"}
        size="md"
        type="date"
        value={dateFrom}
        onChange={handleDateFromChange}
        isInvalid={isAfter(new Date(dateFrom), new Date(dateTo))}
      />
      <Input
        placeholder="Select Date and Time"
        backgroundColor={"white"}
        size="md"
        type="date"
        value={dateTo}
        onChange={handleDateToChange}
      />
    </Stack>
  );
}
