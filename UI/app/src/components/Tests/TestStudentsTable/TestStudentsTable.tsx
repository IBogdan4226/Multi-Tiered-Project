import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { AppRoute } from 'app/src/App';
import { StudentGradeLightDTO } from 'app/src/types/Question';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type StudentGradeTableProps = {
  data: StudentGradeLightDTO[];
  testId: string;
};

const StudentGradeTable = ({ data }: StudentGradeTableProps) => {
  const navigate = useNavigate();

  const gradeCounts = Array(10).fill(0);
  data.forEach((student) => {
    const roundedGrade = Math.round(student.grade);
    if (roundedGrade >= 1 && roundedGrade <= 10) {
      gradeCounts[roundedGrade - 1]++;
    }
  });

  const chartData = {
    labels: Array.from({ length: 10 }, (_, i) => (i + 1).toString()),
    datasets: [
      {
        label: 'Number of Students',
        data: gradeCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <Box height={"content-fit"} overflow={"hidden"}>
      <h1>Student Grades</h1>
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Student Name</strong>
              </TableCell>
              <TableCell>
                <strong>Grade</strong>
              </TableCell>
              <TableCell align="right">
                <strong></strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.studentName}</TableCell>
                <TableCell>{student.grade.toFixed(1)}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      navigate(`${AppRoute.TESTSTUDENTDETAILS}/${student.id}`)
                    }
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h2>Grade Distribution</h2>
      <Bar data={chartData} options={chartOptions} />
    </Box>
  );
};

export default StudentGradeTable;
