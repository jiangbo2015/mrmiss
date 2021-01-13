import { connect } from 'dva';
import Select from '@/components/Select';
const App = props => {
    console.log(props);
    return (
        <div style={{ padding: '24px' }}>
            <Select
                options={[
                    { label: 'Time', value: 'time' },
                    { label: 'Color', value: 'color' },
                ]}
            ></Select>
        </div>
    );
};

export default App;
