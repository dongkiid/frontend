// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import CustomTable from './CustomTable';
// import { Divider } from '@mui/material';


// const categories = [
//     { label: '산책 가요', value: '산책' },
//     { label: '동물 자랑', value: '자랑' },
//     { label: '시터 공고', value: '시터 공고' },
// ];


// export default function BoardListAll() {

//     const [value, setValue] = React.useState('산책');

//     const handleChange = (event: React.SyntheticEvent, newValue: string) => {
//         setValue(newValue);
//     };

//     return (
//         <>
//             <Typography sx={{
//                 width: '100%', typography: 'h4', display: 'flex',
//                 flexDirection: 'column', alignItems: 'center', fontFamily: "SDSamliphopangche_Basic", padding: 3
//             }}>
//                 우리 동네 게시판
//             </Typography>
//             <Divider/>
//             <Box sx={{ width: '100%', typography: 'body1', display: 'flex', flexDirection: 'column'}}>
//                 <TabContext value={value}>
//                     <Box sx={{display:'flex', justifyContent: 'center' }}>
//                         <TabList onChange={handleChange} sx={{ paddingBottom: 3, }} >
//                             {boardList.map((cat) => (
//                                 <Tab sx={{ fontSize: 16 }} label={cat.label} value={cat.value} key={cat.value} />
//                             ))}
//                         </TabList>
//                     </Box>

//                     {categories.map((cat) => (
//                         <TabPanel value={cat.value} key={cat.value}>
//                             <CustomTable category={cat.value} />
//                         </TabPanel>
//                     ))}
//                 </TabContext>


//             </Box>

//         </>
//     );
// }