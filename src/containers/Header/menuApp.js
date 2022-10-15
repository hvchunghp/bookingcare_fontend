export const adminMenu = [
  {
    //quản lý ng dùng
    name: 'menu.admin.manage-user',
    menus: [
      {
        name: 'menu.admin.CRUD',
        link: '/system/user-manage',
      },
      {
        name: 'menu.admin.CRUD-redux',
        link: '/system/user-redux',
      },
      {
        name: 'menu.admin.manage-doctor',
        link: '/system/manage-doctor',
      },
      {
        //quản lý kế hoạch
        name: 'menu.doctor.manage-schedule',
        link: '/system/schedule-manage',
      },
    ],
  },
  {
    //quản lý phòng khám
    name: 'menu.admin.clinic',
    menus: [
      {
        name: 'menu.admin.manage-clinic',
        link: '/system/manage-clinic',
      },
    ],
  },
  {
    //quản lý chuyên khoa
    name: 'menu.admin.specialty',
    menus: [
      {
        name: 'menu.admin.manage-specialty',
        link: '/system/manage-specialty',
      },
    ],
  },
  {
    //quản lý cẩm nang
    name: 'menu.admin.handbook',
    menus: [
      {
        name: 'menu.admin.manage-handbook',
        link: '/system/manage-handbook',
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: 'menu.doctor.manage',
    menus: [
      {
        //quản lý kế hoạch
        name: 'menu.doctor.manage-schedule',
        link: '/doctor/schedule-manage',
      },
      {
        //quản lý bệnh nhân
        name: 'menu.doctor.manage-patient',
        link: '/doctor/manage-patient',
      },
    ],
  },
];
