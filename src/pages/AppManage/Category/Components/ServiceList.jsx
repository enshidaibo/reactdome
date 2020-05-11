import update from "immutability-helper";
import { Table, message, Button } from "antd";
import actionStyles from '@/style/action.scss';
import styles from './ServiceList.scss';
import { dragContext, dragBody } from '@/components/TaberMoveSort'

const ServiceList = ({ deleteService, setVisible, dataSource, onChangeSorts }) => {
    const columns = [{
        title: '图标',
        dataIndex: 'icon',
        key: 'icon',
        align: 'center',
        render: (text) => {
            return <img style={{ width: '36px', height: '36px' }} src={text} />
        }
    }, {
        title: '服务名称',
        dataIndex: 'serviceName',
        key: 'serviceName',
        align: 'center',
    }, {
        title: '操作',
        dataIndex: 'address',
        align: 'center',
        render: (text, record) => (
            <span className={actionStyles.action}>
                <span onClick={() => deleteService(record.id)} className={`iconfont icon-x ${actionStyles.delete}`} title="删除" />
            </span>
        ),
    }];
    const moveRow = (dragIndex, hoverIndex) => {
        const dragRow = dataSource[dragIndex];
        const hoverRow = dataSource[hoverIndex];
        if (dragRow.top != hoverRow.top) {
            return;
        }
        let state = update(
            dataSource, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
            }
        );
        onChangeSorts(state);
    };
    return <Table
        title={() => <div className={styles.header}>
            <span>服务绑定（拖动可排序）</span>
            <Button type='primary' onClick={() => setVisible(true)}>新增服务</Button>
        </div>}
        rowKey='id'
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered={true}
        components={dragBody}
        onRow={(record, index) => ({ index, moveRow })}
        size='small' />
}

export default dragContext(ServiceList);