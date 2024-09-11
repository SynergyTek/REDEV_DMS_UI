import {Card, CardContent, CardHeader, CardTitle} from "~/ui/card"
import { Badge } from "~/ui/badge"
import { Progress } from "~/ui/progress"
import { Button } from "~/ui/button"
import { FileIcon, FolderIcon, ClockIcon, StarIcon, UploadIcon, ShareIcon, TrashIcon } from "lucide-react"
import {
    Pie,
    PieChart,
} from "recharts"
import {ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent} from "~/ui/chart";
import DatePicker , {DatePickerWithRange} from "~/ui/date-picker";
import FormLoader from "~/core/FormLoader";
import formio from '~/core/formio.json'

export default function Component() {
    const recentDocuments = [
        { name: 'Q2 Report.pdf', accessed: '2 hours ago' },
        { name: 'Meeting Notes.docx', accessed: 'Yesterday' },
        { name: 'Budget 2023.xlsx', accessed: '3 days ago' },
        { name: 'Project Proposal.pptx', accessed: '1 week ago' },
    ]

    const recentActivities = [
        { user: 'John Doe', action: 'uploaded', document: 'Q2 Report.pdf', time: '2 minutes ago' },
        { user: 'Jane Smith', action: 'edited', document: 'Project Proposal.docx', time: '15 minutes ago' },
        { user: 'Mike Johnson', action: 'deleted', document: 'Old Invoice.xlsx', time: '1 hour ago' },
        { user: 'Sarah Williams', action: 'shared', document: 'Team Photo.jpg', time: '3 hours ago' },
    ]

    const favoriteFolders = [
        { name: 'Projects', count: 23 },
        { name: 'Client Files', count: 45 },
        { name: 'Personal', count: 12 },
        { name: 'Archive', count: 78 },
    ]

    const chartData = [
        { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
        { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
        { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
        { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
        { browser: "other", visitors: 90, fill: "var(--color-other)" },
    ]
    const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        chrome: {
            label: "PDFs",
            color: "hsl(var(--chart-1))",
        },
        safari: {
            label: "DOCs",
            color: "hsl(var(--chart-2))",
        },
        firefox: {
            label: "XLSs",
            color: "hsl(var(--chart-3))",
        },
        edge: {
            label: "PNGs",
            color: "hsl(var(--chart-4))",
        },
        other: {
            label: "Other",
            color: "hsl(var(--chart-5))",
        },
    }

    return (
        <div className="min-h-screen p-3 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Your Documents</CardTitle>
                        <FileIcon className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">100</div>
                        <p className="text-xs text-green-500">+5 new this week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                        <FileIcon className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.2 GB</div>
                        <p className="text-xs text-blue-500">70% of your quota</p>
                        <Progress value={70} className="mt-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Shared with You</CardTitle>
                        <ShareIcon className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">27</div>
                        <p className="text-xs text-blue-500">3 new shares</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
                        <ClockIcon className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-red-500">Next: Q3 Report (3 days)</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Document Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square w-full max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                        >
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                <Pie data={chartData} dataKey="visitors" className={'bg-blue-700'} innerRadius={60} labelLine={false} label nameKey="browser" />
                                <ChartLegend
                                    content={<ChartLegendContent nameKey="browser" />}
                                    className="flex-wrap gap-4 [&>*]:justify-center"
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {recentDocuments.map((doc, index) => (
                                <li key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-secondary-800 hover:cursor-pointer transition-colors duration-200">
                                    <div className="flex items-center">
                                        <FileIcon className="h-4 w-4 mr-2 text-blue-500" />
                                        <span className="text-sm font-medium">{doc.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{doc.accessed}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="mr-4">
                                        <Badge variant="outline">{activity.action}</Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-blue-500 dark:text-secondary-300">{activity.user} {activity.action} {activity.document}</p>
                                        <p className="text-xs text-muted-foreground dark:text-secondary-500">{activity.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Favorite Folders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {favoriteFolders.map((folder, index) => (
                                <li key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-secondary-800 hover:cursor-pointer transition-colors duration-200">
                                    <div className="flex items-center">
                                        <FolderIcon className="h-4 w-4 mr-2 text-yellow-500" />
                                        <span className="text-sm font-medium">{folder.name}</span>
                                    </div>
                                    <Badge variant="secondary">{folder.count} files</Badge>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="tertiary" className="flex items-center">
                            <UploadIcon className="mr-2 h-4 w-4" /> Upload File
                        </Button>
                        <Button variant="outline" className="flex items-center">
                            <FolderIcon className="mr-2 h-4 w-4" /> New Folder
                        </Button>
                        <Button variant="outline" className="flex items-center">
                            <ShareIcon className="mr-2 h-4 w-4" /> Share
                        </Button>
                        <Button variant="outline" className="flex items-center">
                            <StarIcon className="mr-2 h-4 w-4" /> Add to Favorites
                        </Button>
                        <Button variant="outline" className="flex items-center">
                            <TrashIcon className="mr-2 h-4 w-4" /> Trash
                        </Button>
                    </div>
                    {/*<FormLoader jsonSchema={formio} />*/}
                    {/*<DatePicker />*/}
                    {/*<DatePickerWithRange />*/}
                </CardContent>
            </Card>
        </div>
    )
}