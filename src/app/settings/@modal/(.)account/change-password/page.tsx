import { RouteModal } from "@/components/RouteModal";
import { ChangePasswordRouteContent } from "@/features/settings/modules/account/components/ChangePasswordRouteContent";

export default function ChangePasswordModalPage() {
  return (
    <RouteModal title="Change password">
      <ChangePasswordRouteContent />
    </RouteModal>
  );
}
