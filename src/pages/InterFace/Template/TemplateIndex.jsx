
import ContentLayout from '@/pages/A_Layout/ContentLayout';
import LeftMenu from './Components/LeftMenu';
import localRedux from './localRedux'

const initValue = {
    selectInfo: {
        eventKey: 0,
        isDirectory: true,
        isinit: true
    },
    version: 0,
    action: 'edit',
    trees: [],
    flattenTrees: [],
    addDirLoading: false
}
const TemplateIndex = ({ children }) => {
    return (
        <localRedux.localRudexProvider value={initValue}>
            <ContentLayout>
                <LeftMenu />
                {children}
            </ContentLayout>
        </localRedux.localRudexProvider>
    )
}

export default TemplateIndex