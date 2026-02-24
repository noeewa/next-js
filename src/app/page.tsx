import Image from "next/image";
import Link from 'next/link'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <ul>
      <li><Link href={'/dashboard'}>DASHBOARD</Link></li>
      <li><Link href={'/login'}>LOGIN</Link></li>
      <li><Link href={'/register'}>REGISTER</Link></li>
      <Card>
        <CardTitle>Hello</CardTitle>
      </Card>

    </ul>
  );
}
