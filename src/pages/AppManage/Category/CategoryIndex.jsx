import ContentLayout from '@/pages/A_Layout/ContentLayout';
import LeftMenu from './Components/LeftMenu';
import localRedux from './localRedux'

const initValue = {
    version: 0,
    list: [],
    flattenList: null,
    selectKeys: [],
    departmentId: 0,
}

const CategoryIndex = ({ children }) => {
    return (
        <localRedux.localRudexProvider value={initValue}>
            <ContentLayout>
                <LeftMenu></LeftMenu>
                {children}
            </ContentLayout>
        </localRedux.localRudexProvider>
    )
}

export default CategoryIndex
