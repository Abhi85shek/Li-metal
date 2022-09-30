import { useState, useEffect } from "react";

const Dashboard = () => {
    const [ dashData, setDashData ] = useState(
        {
            draft: '12',
            savedDraft: '21',
            approvalDraft: '16',
            approvedDraft: '25',
            vendorDraft: '18',
            notApprovedDraft: '6'
        }
    )

    const tileStyle = 'p-8 border rounded-lg w-56'
    const valueStyle = 'text-4xl text-center font-medium mb-4'
    const titleStyle = 'text-center'

    return(
        <div>
            <div className="flex px-40 py-8 justify-between">
                <div className={tileStyle}>
                    <div className={valueStyle}>{dashData.draft}</div>
                    <div className={titleStyle}>Drafts</div>
                </div>
                <div className={tileStyle}>
                    <div className={valueStyle + ' ' + 'text-orange-500'}>{dashData.savedDraft}</div>
                    <div className={titleStyle}>Saved Drafts</div>
                </div>
                <div className={tileStyle}>
                    <div className={valueStyle + ' ' + 'text-blue-500'}>{dashData.approvalDraft}</div>
                    <div className={titleStyle}>Approval Drafts</div>
                </div>
                <div className={tileStyle}>
                    <div className={valueStyle + ' ' + 'text-green-500'}>{dashData.approvedDraft}</div>
                    <div className={titleStyle}>Approved Drafts</div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;