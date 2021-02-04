import { connect } from 'dva';
import Select from '@/components/Select';
import Select2 from '@/components/Select/Select2';
import SelectGrayRaduis from '@/components/Select/SelectGrayRaduis';
import InputNumber from '@/components/InputNumber';
import Input, { InputBlackRaduis, InputGray, InputGrayRaduis } from '@/components/Input';
import Switch from '@/components/Switch';
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

            <p>
                <Select2 />
            </p>
            <InputNumber />
            <p />
            <p style={{ paddingTop: '40px' }}>
                <Switch />
            </p>

            <p>
                <InputBlackRaduis />
            </p>
            <p>
                <InputGray />
            </p>
            <p>
                <InputGrayRaduis />
            </p>
            <p>
                <Input />
            </p>
            <p>
                <SelectGrayRaduis />
            </p>
        </div>
    );
};

export default App;
