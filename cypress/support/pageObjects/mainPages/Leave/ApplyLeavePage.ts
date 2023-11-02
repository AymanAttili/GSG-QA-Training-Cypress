export default class ApplyLeavePage{
    URLs = {
        leaveRequests: "/web/index.php/api/v2/leave/leave-requests"
    }

    applyLeaveViaAPI = (leavePayload: any) => {
        return cy.api({
            method: 'POST',
            url: this.URLs.leaveRequests,
            body: leavePayload
        }).its('body');
    }
}