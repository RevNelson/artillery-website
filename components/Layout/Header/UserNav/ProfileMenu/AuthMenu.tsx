import { memo } from "react"
import { Menu } from "@headlessui/react"
import LogoutIcon from "@heroicons/react/outline/LogoutIcon"
import UserIcon from "@heroicons/react/outline/UserIcon"

import useStore from "@lib/hooks/useStore"
import useLogout from "@lib/hooks/auth/useLogout"

import Link from "@components/Link"

import userMenu from "@lib/userMenu"

type PropsType = {
  profileMenuStrings:
    | {
        [key: string]: string | null | undefined
        register?: string | null | undefined
        signIn?: string | null | undefined
        signOut?: string | null | undefined
      }
    | null
    | undefined
}

const AuthMenu = memo(function AuthMenu({ profileMenuStrings }: PropsType) {
  const user = useStore(state => state.auth.user)

  const { logout } = useLogout()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <>
      {userMenu.map(item => (
        <Menu.Item key={"usernav" + item.name}>
          <Link
            href={item.href}
            className="transition flex items-center hover:bg-blue-main outline-none ring-transparent hover:text-yellow text-blue-dark px-4 py-2 text-sm"
          >
            {item.icon({ className: "h-4 w-4 mr-2" })}
            {profileMenuStrings
              ? profileMenuStrings[item.name] ?? item.name.toUpperCase()
              : item.name.toUpperCase()}
          </Link>
        </Menu.Item>
      ))}

      <Menu.Item>
        <div
          className="transition flex cursor-pointer items-center outline-none ring-transparent text-red-main px-4 py-2 text-sm hover:bg-red-main hover:text-white"
          onClick={handleLogout}
        >
          <LogoutIcon className="h-4 w-4 mr-1.5" />
          <div className="target">
            {profileMenuStrings?.signOut ?? "Sign out"}
          </div>
        </div>
      </Menu.Item>

      {user && (
        <Menu.Item>
          <div className="transition flex cursor-pointer items-center outline-none ring-transparent text-red-main px-4 py-2 text-sm hover:bg-red-main hover:text-white">
            <UserIcon className="h-4 w-4 mr-1.5" />
            <div className="target">{user.username}</div>
          </div>
        </Menu.Item>
      )}
    </>
  )
})

export default AuthMenu
