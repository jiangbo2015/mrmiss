import styled from 'styled-components';

const Input = styled('input')`
    width: 300px;
    border-radius: 14px;
    height: 40px;
    border: 1px solid #000;
    padding-left: 50px;
    &:focus {
        outline: none;
    }
`;

export default () => {
    // 搜索
    // const [searchValue, setSearchValue] = useState('');
    // const onSearchChange = e => {
    //     setSearchValue(e.target.value);
    // };
    return <Input placeholder="SEARCH STYLE"></Input>;
};
