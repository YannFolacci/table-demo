export default function Header(props) {

    return (
        <header className="bg-indigo-500 flex flex-1 items-center justify-end md:justify-between px-4 py-2 ">
            {/* rounded top corner : rounded-t-md */}
            <ul className="flex items-center gap-6 text-lg text-white">
                <li><a href="/home" className="">BancGN</a></li>
                <li><a href="#">Utilisateurs</a></li>
                <li><a href="#">Certificat</a></li>
                <li><a href="#">Configuration</a></li>
            </ul>
        </header>
    )
}