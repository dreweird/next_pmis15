
export default function Home() {


  return (
          <section className="relative bg-[url(https://i.pinimg.com/originals/4a/94/26/4a94268541d7a0ed95a8be5138e8a288.jpg)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/90 sm:to-white/25"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Welcome to

            <strong className="block font-extrabold text-blue-700">
               Performance Management Information System
            </strong>
          </h1>

          <p className="mt-2 max-w-lg sm:text-base sm:leading-relaxed">
          PMIS is a sytematic approach for gathering data or information regarding the Budget Execution Documents (BEDs) which contain the agency plans, spending schedules and physical targets for evaluation and consolidation. It is a tool in keeping up-dated records on the present accomplishment status of financial, physical and disbursement of the department/agency/OUs. This data/records is then processed, integrated, and stored in the centralized database and made available to all who have authority to access it, in a form that suits the department's purpose. This will be the basis for measuring the agency's performance.
            
          </p>

          <div className="mt-2 flex flex-wrap gap-4 text-center">
          <a
              href="#"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
            >
              Get Started
            </a>

            <a
              href="#"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>


  );
}
