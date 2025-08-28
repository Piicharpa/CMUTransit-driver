import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Bus late' },
      { name: 'Full bus' },
      { name: 'Driver not on route' },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${categories.count} categories.`);

  // Admins
  const admins = await prisma.admin.createMany({
    data: [
      { fname: 'Admin', lname: 'One', username: 'admin1', password: 'password1' },
      { fname: 'Admin', lname: 'Two', username: 'admin2', password: 'password2' },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${admins.count} admins.`);

  // Students
  const students = await prisma.student.createMany({
    data: [
      { name: 'Alice', studentId: 66012345, email: 'alice@cmu.ac.th' },
      { name: 'Bob', studentId: 66054321, email: 'bob@cmu.ac.th' },
      { name: 'Charlie', studentId: 66098765, email: 'charlie@cmu.ac.th' },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${students.count} students.`);

  // Drivers
  const drivers = await prisma.driver.createMany({
    data: [
      { fname: 'David', lname: 'Jones', email: 'david@cmu.ac.th' },
      { fname: 'Eve', lname: 'Brown', email: 'eve@cmu.ac.th' },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${drivers.count} drivers.`);

  // Buses
  const buses = await prisma.bus.createMany({
    data: [
      { routeNumber: 1, busNumber: 101 },
      { routeNumber: 2, busNumber: 202 },
      { routeNumber: 3, busNumber: 303 },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${buses.count} buses.`);

  // Fetch data for relations
  const seededStudents = await prisma.student.findMany();
  const seededBuses = await prisma.bus.findMany();
  const seededCategories = await prisma.category.findMany();
  const seededDrivers = await prisma.driver.findMany();

  // Reports
  if (seededStudents.length && seededBuses.length && seededCategories.length) {
    await prisma.report.createMany({
      data: [
        {
          studentId: seededStudents[0].id,
          busId: seededBuses[0].id,
          report: 'Bus was 15 minutes late.',
          categoryId: seededCategories[0].id,
        },
        {
          studentId: seededStudents[1].id,
          busId: seededBuses[1].id,
          report: 'Bus was too crowded, couldn\'t get on.',
          categoryId: seededCategories[1].id,
        },
      ],
    });
    console.log('Created reports.');
  }

  // Histories
  if (seededDrivers.length && seededBuses.length) {
    await prisma.history.createMany({
      data: [
        { driverId: seededDrivers[0].id, busId: seededBuses[0].id, startTime: new Date() },
        { driverId: seededDrivers[1].id, busId: seededBuses[1].id, startTime: new Date() },
      ],
    });
    console.log('Created histories.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
