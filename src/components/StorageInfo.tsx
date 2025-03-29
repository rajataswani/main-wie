
import { Card, CardContent } from "@/components/ui/card";
import { DatabaseIcon, InfoIcon } from "lucide-react";

const StorageInfo = () => {
  return (
    <Card className="mb-6 bg-purple-50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <InfoIcon className="h-5 w-5 text-purple-700 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-purple-800 mb-1">Data Storage Information</h3>
            <p className="text-sm text-gray-600">
              All events and awards are stored in Firebase Firestore database. Changes made here will be visible to all users in real-time.
            </p>
            <div className="flex items-center gap-2 mt-3 text-sm text-purple-700">
              <DatabaseIcon className="h-4 w-4" />
              <span>Firebase Firestore Connected</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StorageInfo;
