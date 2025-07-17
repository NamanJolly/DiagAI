import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import moment from "moment";
import { report } from "process";

type props={
    record:SessionDetail
}

function ViewReportDialog({record}:props) {
  return (
    <Dialog>
      <DialogTrigger>
        <ShinyButton>View Report</ShinyButton>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="text-center text-2xl font-semibold text-blue-800">
              🩺 Medical AI Voice Agent Report
            </h2>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-6 mt-6 text-sm text-gray-800">

              {/* Session Info */}
              <div>
                <h3 className="text-base font-semibold border-b pb-1 mb-2 text-blue-600">
                  Session Info
                </h3>
                <div className="grid grid-cols-2 gap-y-2 gap-x-5">
                  <p><span className="font-medium">User:</span> {record.report?.user || "Anonymous"}</p>
                  <p><span className="font-medium">Agent:</span> {record.report?.agent || "AI Agent"}</p>
                  <p><span className="font-medium">Consulted On:</span> {moment(record.report?.timestamp).format("MMMM Do YYYY, h:mm a")}</p>
                  <p><span className="font-medium">Session ID:</span> {record.report?.sessionId}</p>
                </div>
              </div>

              {/* Chief Complaint */}
              <div>
                <h3 className="text-base font-semibold border-b pb-1 mb-2 text-blue-600">
                  Chief Complaint
                </h3>
                <p>{record.report?.chiefComplaint || "N/A"}</p>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-base font-semibold border-b pb-1 mb-2 text-blue-600">
                  Summary
                </h3>
                <p>{record.report?.summary || "N/A"}</p>
              </div>

              {/* Symptoms */}
              {record.report?.symptoms?.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold border-b pb-1 mb-2 text-blue-600">
                    Symptoms
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {record.report?.symptoms.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Duration and Severity */}
              {(record.report?.duration || record.report?.severity) && (
                <div>
                  <h3 className="text-base font-semibold border-b pb-1 mb-2 text-blue-600">
                    Duration & Severity
                  </h3>
                  {record.report?.duration && <p><span className="font-medium">Duration:</span> {record.report?.duration}</p>}
                  {record.report?.severity && <p><span className="font-medium">Severity:</span> {record.report?.severity}</p>}
                </div>
              )}

              {/* Medications */}
              {record.report?.medicationsMentioned?.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold border-b pb-1 mb-2 text-blue-600">
                    Medications Mentioned
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {record.report?.medicationsMentioned.map((med: string, i: number) => (
                      <li key={i}>{med}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {record.report?.recommendations?.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold border-b pb-1 mb-2 text-blue-600">
                    Recommendations
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {record.report?.recommendations.map((rec: string, i: number) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ViewReportDialog;
