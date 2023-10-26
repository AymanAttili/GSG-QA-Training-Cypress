export default class AddEntitlementsPage{
    URLs = {
        checkEntitlement: (data: any) => {return `/web/index.php/api/v2/leave/employees/${data.empNumber}/leave-entitlements?leaveTypeId=${data.entitlementInfo.leaveTypeId}&fromDate=${data.entitlementInfo.fromDate}&toDate=${data.entitlementInfo.toDate}&entitlement=${data.entitlementInfo.entitlement}`},
        addEntitlement: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/leave-entitlements"
    }

    addEntitlementViaAPI = (data: any) => {
        cy.api({
            url: this.URLs.addEntitlement,
            method: 'POST',
            body: {
                empNumber: data.empNumber,
                entitlement: data.entitlementInfo.entitlement,
                fromDate: data.entitlementInfo.fromDate,
                leaveTypeId: data.entitlementInfo.leaveTypeId,
                toDate: data.entitlementInfo.toDate
            }
        })
    }
}