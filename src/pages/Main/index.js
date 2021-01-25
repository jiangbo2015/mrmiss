import { connect } from 'dva';
import Select from '@/components/Select';
import InputNumber from '@/components/InputNumber';
const App = props => {
    console.log(props);
    return (
        <div style={{ padding: '24px' }}>
            <Select
                options={[
                    { label: 'Time', value: 'time' },
                    { label: 'Color', value: 'color' },
                ]}
            />
            <p></p>
            <p style={{ background: '#000000', padding: '20px' }}>
                <Select
                    options={[
                        { label: 'Time', value: 'time' },
                        { label: 'Color', value: 'color' },
                    ]}
                    mode="white"
                />
            </p>

            <p></p>
            <InputNumber />
        </div>
    );
};

export default App;
