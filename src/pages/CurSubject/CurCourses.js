import Card from "@mui/material/Card";
import { useState } from "react";
import BlockSubject from "./blockSubject";

const CurCourses = () => {
  const [subjects, setSubjects] = useState();
  return (
    <Card
      sx={{
        p: 2,
        mx: { xs: 2, lg: 3 },
        mt: 8,
        mb: 4,
        backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
          rgba(white.main, 0.8),
        backdropFilter: "saturate(200%) blur(30px)",
        boxShadow: ({ boxShadows: { xxl } }) => xxl,
      }}
    >
      <BlockSubject subjects={subjects} />
    </Card>
  );
};
export default CurCourses;
