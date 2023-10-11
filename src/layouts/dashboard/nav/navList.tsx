import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

export default function NavList() {
    const [open, setOpen] = React.useState(true);
    const [pet, setPet] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    const handlePetClick = () => {
        setPet(!pet);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <CustomListItem href="/main" primaryText="메인" icon={<HomeOutlinedIcon />} />
            <CustomListItem href="/main" primaryText="반려일지" icon={<PetsOutlinedIcon />} />
            <CustomListItem href="/board" primaryText="게시판" icon={<TextSnippetOutlinedIcon />} />

            <ListItemButton onClick={handleClick} sx={{ pl: 2 }}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="마이페이지" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <CustomListItem href="/member/editPw" primaryText="내 정보" icon={<PermIdentityOutlinedIcon />} plSize={4} />
                    <CustomListItem href="/member/editPw" primaryText="비밀번호 변경" icon={<VpnKeyOutlinedIcon />} plSize={4} />
                    <CustomListItem href="/member/editNick" primaryText="닉네임 변경" icon={<DnsOutlinedIcon />} plSize={4} />
                </List>
            </Collapse>

            <ListItemButton onClick={handlePetClick} sx={{ pl: 2 }}>
                <ListItemIcon>
                    <PetsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="펫" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={pet} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <CustomListItem href="/pet/edit" primaryText="펫 수정" icon={<PetsOutlinedIcon />} plSize={4} />
                    <CustomListItem href="/pet/petform" primaryText="펫 등록" icon={<PetsOutlinedIcon />} plSize={4} />
                </List>
            </Collapse>
        </List>
    );
}


//href:이동할 주소, primaryText:메뉴이름
const CustomListItem = ({ href, primaryText, icon, plSize }: 
    //plSize는 필수아님
    { href: string; primaryText: string; icon: JSX.Element; plSize?: number }) => {
    return (
        <ListItemButton component="a" href={href} sx={{ pl: plSize ? plSize : 2}}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={primaryText} />
        </ListItemButton>
    );
};
