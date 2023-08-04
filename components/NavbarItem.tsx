interface NavbarItemProps{
    label:string,
    active?:boolean
}

export default function NavbarItem({ label, active }: NavbarItemProps) {
    return (
        <div className={active ? 'text-white cursor-default' : 'text-gray-200 hover:text-gray-300 cursor-pointer transition'}>
            {label}
        </div>
    )
}