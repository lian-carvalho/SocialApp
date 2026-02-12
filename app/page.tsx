import API from "@/api/api";

import Link from "next/link";
import ProfileIcon from "@/components/ui/ProfileIcon";

export default function Home() {
  const appAccounts = API.getAccounts();
  return (
    <div className="screen-container">
      <div className="flex pt-xxxs px-l pb-xs gap-m bg-dark rounded-b-l overflow-x-scroll scrollbar-none">
        {appAccounts.map((account, index) =>
          <AccountDisplay
            key={index}
            accountId={account.id}
            accountName={account.name}
            imgUrl={account.profileImageUrl}
            hasPosts={account.postsQtd}
          />
        )}
      </div>
    </div>
  );
}

type AccountDisplayProps = {
  accountId: number;
  accountName: string;
  imgUrl: string;
  hasPosts: boolean;
};

function AccountDisplay({ accountId, accountName, imgUrl, hasPosts }: AccountDisplayProps) {
  const state = hasPosts ? 'active' : 'disabled';
  return (
    <Link href={`/profile/${accountId}`} className="max-w-[70px] flex flex-col items-center gap-xxs">
      <ProfileIcon imageUrl={imgUrl} imageSize={50} style={state} />
      <h6 className="text-white text-center w-full truncate">{accountName}</h6>
    </Link>
  )
}