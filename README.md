## Technologies used

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/) (ORM)
- [SQLite](https://sqlite.org/) (DB)
- [Tailwind CSS](https://tailwindcss.com/)


## Getting Started

Install the project :
```bash
npm install
```

Initialize the Database :
```bash
npx prisma migrate dev --name init
```

Seed the Database : 
```bash
node prisma/seed.js     
```

Run the project :
```bash
npm run dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


